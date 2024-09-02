"use client";

import { useState } from "react";
import {
  flexRender,
  type Row,
  type CellContext,
  type RowData,
} from "@tanstack/react-table";
import { TableRow, TableCell } from "@/components/ui/table-grid";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";

import { trpc } from "@/lib/trpc/client";
import { useAppStore } from "@/lib/stores/AppStoreProvider";

interface TrackTableRowProps {
  row: Row<PlaylistTrack>;
  playlist: {
    id: string;
    name: string;
    type: "playlist";
    uri: `spotify:playlist:${string}`;
  };
}

export type ExtendedCellContext<TData extends RowData, TValue> = CellContext<
  TData,
  TValue
> & {
  playlist: TrackTableRowProps["playlist"];
  isPlaybackContext: boolean;
  isSaved: boolean;
  toggleIsSaved: () => boolean;
};

export default function TrackTableRow({ row, playlist }: TrackTableRowProps) {
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

  const toggleIsSaved = async () => {
    if (isSaved) {
      await unsaveTrackMutation.mutateAsync([row.original.id]);
    } else {
      await saveTrackMutation.mutateAsync([row.original.id]);
    }
  };

  const isPlaybackContext = playbackState
    ? playbackState.context.uri === playlist.uri &&
      (playbackState.track_window.current_track.uri === row.original.uri ||
        (playbackState.track_window.current_track.name === row.original.name &&
          playbackState.track_window.current_track.album.name ===
            row.original.album.name
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
            playlist,
            isPlaybackContext,
            isSaved,
            toggleIsSaved,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
}
