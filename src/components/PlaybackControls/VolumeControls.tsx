import { Slider } from "@/components/ui/slider";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";

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
      mute();
    } else {
      setPreviousVolumeLevel(value!);
      // api call
    }
  }

  return (
    <div className="flex justify-between items-center gap-2">
      {volumeLevel === 0
        ? <VolumeXIcon
            onClick={unMute}
            size={18}
          />
        : volumeLevel < 51 
          ? <Volume1Icon onClick={mute} size={18}/>
          : <Volume2Icon onClick={mute} size={18}/>
      }
      <Slider
        value={[volumeLevel]}
        onValueChange={handleVolumeChange}
        onValueCommit={handleVolumeCommit}
        min={0}
        max={100}
        step={1}
        className={cn(
          "w-60%"
        )}
      />
    </div>
  );
}