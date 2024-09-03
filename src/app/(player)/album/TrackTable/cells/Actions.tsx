"use client";

import { type CellContext } from "@tanstack/react-table";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/TrackTable/TrackTableRow";
import ActionsMenu from "@/app/(player)/album/TrackTable/ActionsMenu";

import { trpc } from "@/lib/trpc/client";

export function ActionsCell(props: CellContext<AlbumTrack, unknown>) {
  const { album, row, isSaved, toggleIsSaved } = props as ExtendedCellContext<
    AlbumTrack,
    null
  >;
  const { artists, id, name, uri, type } = row.original;

  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error), // TODO: add toast
  });

  const addToQueue = () => addToQueueMutation.mutateAsync(uri);

  return (
    <ActionsMenu
      artists={artists}
      album={album}
      track={{ id, isSaved, name, uri, type }}
      addToQueue={addToQueue}
      toggleIsSaved={toggleIsSaved}
    />
  );
}
