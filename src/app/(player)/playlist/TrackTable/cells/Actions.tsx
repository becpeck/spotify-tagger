"use client";

import { type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import ActionsMenu from "@/app/(player)/playlist/TrackTable/ActionsMenu";

import { trpc } from "@/lib/trpc/client";

export function ActionsCell(props: CellContext<PlaylistTrack, unknown>) {
  const { row, isSaved, playlist, toggleIsSaved } =
    props as ExtendedCellContext<PlaylistTrack, null>;
  const { album, artists, id, name, uri, type } = row.original;

  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error), // TODO: add toast
  });

  const addToQueue = () => addToQueueMutation.mutateAsync(uri);

  return (
    <ActionsMenu
      artists={artists}
      album={album}
      track={{ id, isSaved, name, uri, type }}
      playlist={playlist}
      addToQueue={addToQueue}
      toggleIsSaved={toggleIsSaved}
    />
  );
}
