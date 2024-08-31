"use client";

import {
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  Repeat1Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ShuffleButton from "@/components/buttons/ShuffleButton";

import PlayPauseButton from "@/components/buttons/PlayPauseButton";
import SeekSlider from "@/components/PlaybackBar/SeekSlider";

import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type PlaybackControlsProps = {
  className?: string;
  player: {
    togglePlay: SpotifyPlayer["togglePlay"];
    nextTrack: SpotifyPlayer["nextTrack"];
    previousTrack: SpotifyPlayer["previousTrack"];
    seek: SpotifyPlayer["seek"];
  };
  playerState: WebPlaybackState;
};

export default function PlaybackControls(props: PlaybackControlsProps) {
  const { className, player, playerState } = props;

  const shuffleMutation = trpc.playback.toggleShuffle.useMutation();
  const repeatMutation = trpc.playback.cycleRepeat.useMutation();

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex justify-center items-center gap-2">
        <ShuffleButton
          size="sm"
          disabled={!playerState}
          isShuffleOn={playerState.shuffle}
          onClick={() =>
            shuffleMutation.mutateAsync({ state: !playerState.shuffle })
          }
          aria-label={`${playerState.shuffle ? "Disable" : "Enable"} shuffle`}
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "[--back-color:--muted-foreground] hover:[--back-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          disabled={playerState.disallows.skipping_prev}
          onClick={async () => await player.previousTrack()}
          aria-label="Skip Back"
        >
          <SkipBackIcon
            className="h-5 w-5"
            stroke="hsl(var(--back-color))"
            fill="hsl(var(--back-color))"
          />
        </Button>
        <PlayPauseButton
          isPlaying={!playerState.paused}
          disabled={
            playerState.paused
              ? playerState.disallows.resuming
              : playerState.disallows.pausing
          }
          onClick={async () => await player.togglePlay()}
          aria-label={playerState.paused ? "Play" : "Pause"}
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "[--forward-color:--muted-foreground] hover:[--forward-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          disabled={playerState.disallows.skipping_next}
          onClick={async () => await player.nextTrack()}
          aria-label="Skip Forward"
        >
          <SkipForwardIcon
            className="h-5 w-5"
            stroke="hsl(var(--forward-color))"
            fill="hsl(var(--forward-color))"
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            playerState.repeat_mode === 0
              ? "[--repeat-color:--muted-foreground] hover:[--repeat-color:--primary]"
              : "[--repeat-color:--green]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          disabled={
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            playerState.disallows.toggling_repeat_context ||
            playerState.disallows.toggling_repeat_track
          }
          onClick={() => repeatMutation.mutateAsync(playerState.repeat_mode)}
          aria-label={
            playerState.repeat_mode === 2
              ? "Turn off repeat"
              : `Set repeat to ${
                  playerState.repeat_mode === 0 ? "context" : "track"
                }`
          }
        >
          {playerState.repeat_mode === 2 ? (
            <Repeat1Icon
              className="h-5 w-5"
              stroke="hsl(var(--repeat-color))"
            />
          ) : (
            <RepeatIcon className="h-5 w-5" stroke="hsl(var(--repeat-color))" />
          )}
        </Button>
      </div>
      <SeekSlider
        disabled={playerState.disallows.seeking}
        duration_ms={playerState.duration}
        paused={playerState.paused}
        position_ms={playerState.position}
        seek={player.seek.bind(player)}
      />
    </div>
  );
}
