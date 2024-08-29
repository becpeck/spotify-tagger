import { type CellContext } from "@tanstack/react-table";
import { HashIcon, PlayIcon, PauseIcon } from "lucide-react";

import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/trackTable/TrackTableRow";
import { Button } from "@/components/ui/button";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export function NumberHeader() {
  return (
    <div className="w-full flex justify-center align-center">
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
  const Icon = isPlaying ? PauseIcon : PlayIcon;

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
    <Button
      variant="ghost"
      className="h-8 w-8 p-0 text-muted-foreground"
      disabled={!player}
      onClick={toggleIsPlaying}
    >
      <div
        className={cn(
          "group-hover/row:hidden tabular-nums text-base",
          isPlaybackContext && "text-green-500"
        )}
      >
        {row.original.track_number}
      </div>
      <div className="hidden group-hover/row:block">
        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        <Icon
          size={15}
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
        />
      </div>
    </Button>
  );
}
