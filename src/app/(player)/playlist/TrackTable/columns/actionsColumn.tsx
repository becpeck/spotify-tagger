import { type ColumnDef } from "@tanstack/react-table";
import { type Track } from "@/app/(player)/playlist/TrackTable";
import ActionsMenu from "@/app/(player)/playlist/TrackTable/ActionsMenu";

const actionsColumn: ColumnDef<Track, never> = {
  id: "actions",
  enableGlobalFilter: false,
  cell: ({ row, table }) => {
    const { album, artists, track, isSaved, addToQueue, toggleIsSaved } =
      row.original;
    const playlist = table.options.meta!.playlist!;
    const userPlaylists = table.options.meta!.userPlaylists;
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
