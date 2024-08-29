import { type CellContext } from "@tanstack/react-table";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/trackTable/TrackTableRow";
import ActionsMenu from "@/app/(player)/album/trackTable/ActionsMenu";

import { trpc } from "@/lib/trpc/client";

export function ActionsCell(props: CellContext<AlbumTrack, unknown>) {
  const { album, row, table, isSaved, toggleIsSaved } =
    props as ExtendedCellContext<AlbumTrack, null>;
  const { artists, id, name, uri, type } = row.original;
  const userPlaylists = table.options.meta!.userPlaylists;

  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error), // TODO: add toast
  });

  const addToQueue = () => addToQueueMutation.mutateAsync(uri);

  return (
    <ActionsMenu
      artists={artists}
      album={album}
      track={{ id, isSaved, name, uri, type }}
      userPlaylists={userPlaylists}
      addToQueue={addToQueue}
      toggleIsSaved={toggleIsSaved}
    />
  );
}
