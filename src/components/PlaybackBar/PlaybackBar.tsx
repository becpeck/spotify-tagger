import { ListMusicIcon, MonitorSpeakerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import CurrentlyPlaying from "@/components/PlaybackBar/CurrentlyPlaying";
import PlaybackControls from "@/components/PlaybackBar/PlaybackControls";
import VolumeControls from "@/components/PlaybackBar/VolumeControls";

import { cn } from "@/lib/utils";

export default function PlaybackBar() {
  return (
    <footer className="flex justify-between items-center w-full p-4 border gap-8">
      <CurrentlyPlaying />
      <PlaybackControls />
      <div className="flex justify-end items-center grow max-w-[30%]">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "[--queue-color:--muted-foreground] hover:[--queue-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent px-2"
          )}
          onClick={() => {}}
          aria-label="Queue"
        >
          <ListMusicIcon className="h-5 w-5" stroke="hsl(var(--queue-color))" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "[--devices-color:--muted-foreground] hover:[--devices-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent px-2"
          )}
          onClick={() => {}}
          aria-label="Devices"
        >
          <MonitorSpeakerIcon
            className="h-5 w-5"
            stroke="hsl(var(--devices-color))"
          />
        </Button>
        <VolumeControls />
      </div>
    </footer>
  );
}
