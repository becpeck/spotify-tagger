"use client";

import { useAppStore } from "@/stores/AppStoreProvider";

import CurrentlyPlaying from "@/components/PlaybackBar/CurrentlyPlaying";
import PlaybackControls from "@/components/PlaybackBar/PlaybackControls";
import QueueButton from "@/components/PlaybackBar/QueueButton";
import DeviceButton from "@/components/PlaybackBar/DeviceButton";
import VolumeControls from "@/components/PlaybackBar/VolumeControls";

export default function PlaybackBar() {
  const { player, playbackState } = useAppStore(
    ({ player, playbackState }) => ({
      player,
      playbackState,
    })
  );

  if (!player || !playbackState) {
    return;
  } else {
    return (
      <footer className="flex justify-between items-center w-full p-4 border gap-8">
        <CurrentlyPlaying
          className="grow max-w-[30%]"
          currentTrack={playbackState.track_window.current_track}
        />
        <PlaybackControls
          className="grow max-w-[40%]"
          player={{
            togglePlay: player.togglePlay.bind(player),
            nextTrack: player.nextTrack.bind(player),
            previousTrack: player.previousTrack.bind(player),
            seek: player.seek.bind(player),
          }}
          playerState={playbackState}
        />
        <div className="grow max-w-[30%] flex justify-end items-center">
          <QueueButton />
          <DeviceButton />
          <VolumeControls
            initialVolume={1}
            setVolume={player.setVolume.bind(player)}
          />
        </div>
      </footer>
    );
  }
}
