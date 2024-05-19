"use client";

import { useAtomValue } from "jotai";
import { playerAtom, playerStateAtom } from "@/app/(player)/playback/playbackAtoms";

import CurrentlyPlaying from "@/components/PlaybackBar/CurrentlyPlaying";
import PlaybackControls from "@/components/PlaybackBar/PlaybackControls";
import QueueButton from "@/components/PlaybackBar/QueueButton";
import DeviceButton from "@/components/PlaybackBar/DeviceButton";
import VolumeControls from "@/components/PlaybackBar/VolumeControls";

export default function PlaybackBar() {
  const player = useAtomValue(playerAtom);
  const playerState = useAtomValue(playerStateAtom);

  if (!player || !playerState) {
    return;
  } else {
    return (
      <footer className="flex justify-between items-center w-full p-4 border gap-8">
        <CurrentlyPlaying
          className="grow max-w-[30%]"
          currentTrack={playerState.track_window.current_track}
        />
        <PlaybackControls className="grow max-w-[40%]"/>
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
