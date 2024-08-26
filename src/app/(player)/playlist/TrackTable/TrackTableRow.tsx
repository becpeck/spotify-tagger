"use client";

import { useState } from "react";
import {
  flexRender,
  type Row,
  type CellContext,
  type RowData,
} from "@tanstack/react-table";
import { TableRow, TableCell } from "@/components/ui/table-grid";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";

import { trpc } from "@/lib/trpc/client";
import { useAppStore } from "@/lib/stores/AppStoreProvider";

interface TrackTableRowProps {
  row: Row<TrackData>;
  trackData: TrackData;
  playlistUri: `spotify:playlist:${string}`;
}

export type ExtendedCellContext<TData extends RowData, TValue> = CellContext<
  TData,
  TValue
> & {
  isPlaybackContext: boolean;
  isSaved: boolean;
  toggleIsSaved: () => boolean;
};

export default function TrackTableRow({
  row,
  trackData,
  playlistUri,
}: TrackTableRowProps) {
  const { playbackState } = useAppStore(({ playbackState }) => ({
    playbackState,
  }));
  const [isSaved, setIsSaved] = useState(trackData.isSaved);

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
      unsaveTrackMutation.mutate([trackData.track.id]);
    } else {
      saveTrackMutation.mutate([trackData.track.id]);
    }
  };

  const isPlaybackContext = playbackState
    ? playbackState.context.uri === playlistUri &&
      (playbackState.track_window.current_track.uri === trackData.track.uri ||
        (playbackState.track_window.current_track.name ===
          trackData.track.name &&
          playbackState.track_window.current_track.album.name ===
            trackData.album.name))
    : // && artists.every(artist => artists)
      false;

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
