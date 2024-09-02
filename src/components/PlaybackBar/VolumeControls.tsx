"use client";

import { useState } from "react";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import IconButton from "@/components/buttons/IconButton";

export default function VolumeControls({
  initialVolume,
  setVolume,
}: {
  initialVolume: number;
  setVolume: SpotifyPlayer["setVolume"];
}) {
  const [previousVolumeLevel, setPreviousVolumeLevel] = useState(initialVolume);
  const [volumeLevel, setVolumeLevel] = useState(initialVolume);

  const mute = async () => {
    setPreviousVolumeLevel(volumeLevel);
    setVolumeLevel(0);
    await setVolume(0);
  };

  const unMute = async () => {
    setVolumeLevel(previousVolumeLevel);
    await setVolume(previousVolumeLevel);
  };

  const handleVolumeChange = async ([value]: number[]) => {
    setVolumeLevel(value!);
    await setVolume(value!);
  };

  const handleVolumeCommit = ([value]: number[]) => {
    if (value! !== 0) {
      setPreviousVolumeLevel(value!);
    }
  };

  return (
    <div className="flex items-center group/volume basis-56 shrink gap-2">
      <IconButton
        size="md"
        className="shrink-0"
        Icon={
          volumeLevel === 0
            ? VolumeXIcon
            : volumeLevel < 0.51
              ? Volume1Icon
              : Volume2Icon
        }
        onClick={volumeLevel === 0 ? unMute : mute}
        aria-label={volumeLevel === 0 ? "Unmute" : "Mute"}
      />
      <Slider
        value={[volumeLevel]}
        onValueChange={handleVolumeChange}
        onValueCommit={handleVolumeCommit}
        min={0}
        max={1}
        step={0.01}
      >
        <SliderTrack className="h-1">
          <SliderRange className="group-hover/volume:bg-green-500 rounded-full" />
        </SliderTrack>
        <SliderThumb className="bg-transparent group-hover/volume:bg-primary border-none focus-visible:ring-transparent h-3 w-3" />
      </Slider>
    </div>
  );
}
