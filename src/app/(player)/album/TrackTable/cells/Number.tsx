import { type CellContext } from "@tanstack/react-table";
import { HashIcon } from "lucide-react";

import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/TrackTable/TrackTableRow";
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

export function NumberCell(props: CellContext<AlbumTrack, number>) {
  const { album, row, isPlaybackContext } = props as ExtendedCellContext<
    AlbumTrack,
    number
  >;
  const { playbackState, player } = useAppStore(
    ({ playbackState, player }) => ({
      playbackState,
      player,
    })
  );
  const playContextMutation = trpc.playback.playWithContext.useMutation(); // TODO: add secondary playback state context
  const isPlaying = isPlaybackContext && !playbackState!.paused;

  const toggleIsPlaying = async () => {
    if (!isPlaybackContext) {
      await playContextMutation.mutateAsync({
        context: { uri: album.uri },
        offset: { uri: row.original.uri },
      });
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
