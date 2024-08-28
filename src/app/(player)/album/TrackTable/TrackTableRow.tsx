"use client";

import { useState } from "react";
import {
  flexRender,
  type Row,
  type CellContext,
  type RowData,
} from "@tanstack/react-table";
import { TableRow, TableCell } from "@/components/ui/table-grid";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";

import { trpc } from "@/lib/trpc/client";
import { useAppStore } from "@/lib/stores/AppStoreProvider";

interface TrackTableRowProps {
  row: Row<AlbumTrack>;
  album: {
    id: string;
    name: string;
    uri: `spotify:album:${string}`;
  };
}

export type ExtendedCellContext<TData extends RowData, TValue> = CellContext<
  TData,
  TValue
> & {
  isPlaybackContext: boolean;
  isSaved: boolean;
  toggleIsSaved: () => boolean;
};

export default function TrackTableRow({ row, album }: TrackTableRowProps) {
  const { playbackState } = useAppStore(({ playbackState }) => ({
    playbackState,
  }));
  const [isSaved, setIsSaved] = useState(row.original.is_saved);

  const addOrDelete = (addOrDelete: "add" | "delete") => {
    const oldSaved = isSaved;
    setIsSaved(addOrDelete === "add");
    return oldSaved;
  };

  const saveTrackMutation = trpc.tracks.saveTracks.useMutation({
    onMutate: () => addOrDelete("add"),
    onError: (error, trackIds, context) => setIsSaved(context!),
  });
  const unsaveTrackMutation = trpc.tracks.unsaveTracks.useMutation({
    onMutate: () => addOrDelete("delete"),
    onError: (error, trackIds, context) => setIsSaved(context!),
  });

  const toggleIsSaved = () => {
    if (isSaved) {
      unsaveTrackMutation.mutate([row.original.id]);
    } else {
      saveTrackMutation.mutate([row.original.id]);
    }
  };

  const isPlaybackContext = playbackState
    ? playbackState.context.uri === album.uri &&
      (playbackState.track_window.current_track.uri === row.original.uri
        || (playbackState.track_window.current_track.name === row.original.name 
          && playbackState.track_window.current_track.album.name === album.name
          // && artists.every(artist => artists)
        )
      )
    : false;

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className="group/row"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, {
            ...cell.getContext(),
            isPlaybackContext,
            isSaved,
            toggleIsSaved,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
}
