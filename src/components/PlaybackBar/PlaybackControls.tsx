"use client";

import {
  SkipBackButton,
  SkipForwardButton,
} from "@/components/buttons/SkipButton";
import PlayPauseButton from "@/components/buttons/PlayPauseButton";
import RepeatButton from "@/components/buttons/RepeatButton";
import ShuffleButton from "@/components/buttons/ShuffleButton";
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
    <div
      className={cn(
        "flex flex-col items-center justify-between h-full",
        className
      )}
    >
      <div className="flex justify-center items-center gap-3">
        <ShuffleButton
          size="lg"
          disabled={!playerState}
          isShuffleOn={playerState.shuffle}
          onClick={() =>
            shuffleMutation.mutateAsync({ state: !playerState.shuffle })
          }
          aria-label={`${playerState.shuffle ? "Disable" : "Enable"} shuffle`}
        />
        <SkipBackButton
          disabled={playerState.disallows.skipping_prev}
          onClick={async () => await player.previousTrack()}
          aria-label="Skip Back"
        />
        <PlayPauseButton
          size="lg"
          isPlaying={!playerState.paused}
          disabled={
            playerState.paused
              ? playerState.disallows.resuming
              : playerState.disallows.pausing
          }
          onClick={async () => await player.togglePlay()}
          aria-label={playerState.paused ? "Play" : "Pause"}
        />
        <SkipForwardButton
          disabled={playerState.disallows.skipping_next}
          onClick={async () => await player.nextTrack()}
          aria-label="Skip Forward"
        />
        <RepeatButton
          repeat_mode={playerState.repeat_mode}
          disabled={
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            playerState.disallows.toggling_repeat_context ||
            playerState.disallows.toggling_repeat_track
          }
          onClick={() => repeatMutation.mutateAsync(playerState.repeat_mode)}
        />
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
