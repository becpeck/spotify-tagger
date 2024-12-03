"use client";

import { type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { trpc } from "@/lib/trpc/client";

import ActionsMenuLocalTrack from "@/app/(player)/playlist/TrackTable/ActionsMenuLocalTrack";
import ActionsMenu from "@/app/(player)/playlist/TrackTable/ActionsMenu";

export function ActionsCell(props: CellContext<PlaylistTrack, unknown>) {
  const { row, isSaved, playlist, toggleIsSaved } =
    props as ExtendedCellContext<PlaylistTrack, null>;
  const { album, artists, id, is_local, name, uri, type } = row.original;

  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error), // TODO: add toast
  });

  const addToQueue = () => !is_local && addToQueueMutation.mutateAsync(uri);

  if (is_local) {
    return <ActionsMenuLocalTrack track={row.original} playlist={playlist} />;
  } else {
    return (
      <ActionsMenu
        artists={artists}
        album={album}
        track={{ id, isSaved, is_local, name, uri, type }}
        playlist={playlist}
        addToQueue={addToQueue}
        toggleIsSaved={toggleIsSaved}
      />
    );
  }
}
