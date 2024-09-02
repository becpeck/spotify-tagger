import { type CellContext } from "@tanstack/react-table";
import { HashIcon } from "lucide-react";

import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import PlayPauseButton from "@/components/buttons/PlayPauseButton";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export function NumberHeader() {
  return (
    <div className="w-full flex justify-end px-1">
      <span className="sr-only">Track Number</span>
      <HashIcon size={15} />
    </div>
  );
}

export function NumberCell(props: CellContext<PlaylistTrack, number>) {
  const { row, table, isPlaybackContext, playlist } = props as ExtendedCellContext<
    PlaylistTrack,
    number
  >;
  const { playbackState, player } = useAppStore(
    ({ playbackState, player }) => ({
      playbackState,
      player,
    })
  );
  const playContextMutation = trpc.playback.playWithContext.useMutation();
  const playUrisMutation = trpc.playback.playUris.useMutation({
    // onSuccess: () => {}   // TODO: add secondary playback state context
  });
  const isPlaying = isPlaybackContext && !playbackState!.paused;

  const toggleIsPlaying = async () => {
    if (!isPlaybackContext) {
      const tableState = table.getState();
      const sorting = tableState.sorting;
      const globalFilter = tableState.globalFilter as string;
      // TODO: change this to a function that determines whether view is different from original
      if (globalFilter.length === 0 && sorting.length === 0) {
        await playContextMutation.mutateAsync({
          context: { uri: playlist.uri },
          offset: { uri: row.original.uri },
        });
      } else {
        let uris = table
          .getRowModel()
          .rows.map((row) => row.original.uri);
        if (uris[0] !== row.original.uri) {
          const index = uris.findIndex((uri) => uri === row.original.uri);
          uris = uris.slice(index).concat(uris.slice(0, index));
        }
        await playUrisMutation.mutateAsync({ uris });
      }
    } else {
      if (isPlaying) {
        await player!.pause.bind(player)();
      } else {
        await player!.resume.bind(player)();
      }
    }
  };

  return (
    <div className="w-full flex justify-end">
      <PlayPauseButton
        size="sm"
        variant="normal"
        className="hidden group-hover/row:flex text-primary h-8 w-[calc(100% - 0.25rem)]"
        disabled={!playbackState || !player}
        isPlaying={isPlaying}
        onClick={toggleIsPlaying}
        aria-label={isPlaying ? "Pause" : "Play"}
      />
      <div
        className={cn(
          "group-hover/row:hidden tabular-nums text-base text-muted-foreground px-1",
          isPlaybackContext && "text-green-500"
        )}
      >
        {row.original.track_number}
      </div>
    </div>
  );
}
