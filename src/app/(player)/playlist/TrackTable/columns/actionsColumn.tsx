import { type ColumnDef } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import ActionsMenu from "@/app/(player)/playlist/TrackTable/ActionsMenu";

import { trpc } from "@/lib/trpc/client";

const actionsColumn: ColumnDef<TrackData, null> = {
  id: "actions",
  enableGlobalFilter: false,
  cell: (context) => {
    const { row, table, isSaved, toggleIsSaved } =
      context as ExtendedCellContext<TrackData, null>;
    const { album, artists, track } = row.original;
    const playlist = table.options.meta!.playlist!;
    const userPlaylists = table.options.meta!.userPlaylists;

    const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
      onError: (error) => console.error(error), // TODO: add toast
    });

    const addToQueue = () => addToQueueMutation.mutate(track.uri);

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
  },
};

export default actionsColumn;
