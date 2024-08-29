import { type CellContext } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import ActionsMenu from "@/app/(player)/playlist/TrackTable/ActionsMenu";

import { trpc } from "@/lib/trpc/client";

export function ActionsCell(props: CellContext<TrackData, unknown>) {
  const { row, table, isSaved, toggleIsSaved } = props as ExtendedCellContext<
    TrackData,
    null
  >;
  const { album, artists, track } = row.original;
  const playlist = table.options.meta!.playlist!;
  const userPlaylists = table.options.meta!.userPlaylists;

  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error), // TODO: add toast
  });

  const addToQueue = () => addToQueueMutation.mutateAsync(track.uri);

  return (
    <ActionsMenu
      artists={artists}
      album={album}
      track={{ ...track, isSaved }}
      playlist={playlist}
      userPlaylists={userPlaylists}
      addToQueue={addToQueue}
      toggleIsSaved={toggleIsSaved}
    />
  );
}
