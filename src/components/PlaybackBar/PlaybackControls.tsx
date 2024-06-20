"use client";

import {
  PlayIcon,
  PauseIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  Repeat1Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import SeekSlider from "@/components/PlaybackBar/SeekSlider";

import { trpc } from "@/trpc/client";
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

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            playerState.shuffle
              ? "[--shuffle-color:--green]"
              : "[--shuffle-color:--muted-foreground] hover:[--shuffle-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          disabled={playerState.disallows.toggling_shuffle}
          onClick={() => shuffleMutation.mutate({ state: !playerState.shuffle })}
          aria-label={`${playerState.shuffle ? "Disable" : "Enable"} shuffle`}
        >
          <ShuffleIcon className="h-5 w-5" stroke="hsl(var(--shuffle-color))" />
        </Button>
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
        <Button
          variant="default"
          size="icon"
          className="rounded-full bg-green-500 hover:bg-green-500 h-10 w-10 hover:transform hover:scale-105 active:transform-none active:brightness-75"
          disabled={playerState.paused ? playerState.disallows.resuming : playerState.disallows.pausing}
          onClick={async () => await player.togglePlay()}
          aria-label={playerState.paused ? "Play" : "Pause"}
        >
          {playerState.paused
            ? <PlayIcon
                className="h-5 w-5"
                stroke="hsl(var(--background))"
                fill="hsl(var(--background))"
              />
            : <PauseIcon
                className="h-5 w-5"
                stroke="hsl(var(--background))"
                fill="hsl(var(--background))"
              />
          }
        </Button>
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
          disabled={playerState.disallows.toggling_repeat_context || playerState.disallows.toggling_repeat_track}
          // onClick={() => {}}
          aria-label={playerState.repeat_mode === 2
            ? "Turn off repeat"
            : `Set repeat to ${playerState.repeat_mode === 0 ? "context" : "track"}`
          }
        >
          {playerState.repeat_mode === 2
            ? <Repeat1Icon className="h-5 w-5" stroke="hsl(var(--repeat-color))"/>
            : <RepeatIcon className="h-5 w-5" stroke="hsl(var(--repeat-color))" />
          }
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
