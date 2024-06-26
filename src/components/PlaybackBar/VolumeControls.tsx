"use client";

import { useState } from "react";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
    <div className="flex items-center group/volume basis-56 shrink">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "[--volume-color:--muted-foreground] hover:[--volume-color:--primary]",
          "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent px-2"
        )}
        onClick={volumeLevel === 0 ? unMute : mute}
        aria-label={volumeLevel === 0 ? "Unmute" : "Mute"}
      >
        {volumeLevel === 0
          ? <VolumeXIcon className="h-5 w-5" stroke="hsl(var(--volume-color))"/>
          : volumeLevel < 0.51 
            ? <Volume1Icon className="h-5 w-5" stroke="hsl(var(--volume-color))"/>
            : <Volume2Icon className="h-5 w-5" stroke="hsl(var(--volume-color))"/>
        }
      </Button>
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
