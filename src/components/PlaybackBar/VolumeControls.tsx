import { useState } from "react";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import { Slider, SliderTrack, SliderRange, SliderThumb } from "@/components/ui/slider";

export default function VolumeControls() {
  const [previousVolumeLevel, setPreviousVolumeLevel] = useState(35);
  const [volumeLevel, setVolumeLevel] = useState(35);

  const mute = () => {
    setPreviousVolumeLevel(volumeLevel);
    setVolumeLevel(0);
    // api call
  }

  const unMute = () => {
    setVolumeLevel(previousVolumeLevel);
    // api call
  }

  const handleVolumeChange = ([ value ]: number[]) => {
    setVolumeLevel(value!);
  }

  const handleVolumeCommit = ([ value ]: number[]) => {
    if (value === 0) {
      setVolumeLevel(0);
    } else {
      setPreviousVolumeLevel(value!);
    }
    // api call
  }

  return (
    <div className="flex justify-between items-center gap-2 group/volume w-full">
      <button onClick={volumeLevel === 0 ? unMute : mute}>
        {volumeLevel === 0
          ? <VolumeXIcon
              onClick={unMute}
              size={20}
            />
          : volumeLevel < 51 
            ? <Volume1Icon
                onClick={mute}
                size={20}
              />
            : <Volume2Icon
                onClick={mute}
                size={20}
              />
        }
      </button>
      <Slider
        value={[volumeLevel]}
        onValueChange={handleVolumeChange}
        onValueCommit={handleVolumeCommit}
        min={0}
        max={100}
        step={1}  
      >
        <SliderTrack>
          <SliderRange className="group-hover/volume:bg-green-500 rounded-full" />
        </SliderTrack>
        <SliderThumb className="bg-transparent group-hover/volume:bg-primary border-none" />
      </Slider>
    </div>
  );
}