"use client";

import { useState } from "react";
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
import SeekSlider from "@/app/(player)/layout/playback-bar/seek-slider";

import { cn } from "@/lib/utils";

export default function PlaybackControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatState, setRepeatState] = useState<"off" | "context" | "track">("off");

  const toggleIsPlaying = () => setIsPlaying(!isPlaying);
  const toggleShuffleOn = () => setShuffleOn(!shuffleOn);
  const updateRepeatState = () => setRepeatState(
    repeatState === "off" 
      ? "context" 
      : (repeatState === "context" 
        ? "track" 
        : "off")
  );

  return (
    <div className="flex flex-col items-center gap-2 grow max-w-[40%]">
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            shuffleOn
              ? "[--shuffle-color:--green]"
              : "[--shuffle-color:--muted-foreground] hover:[--shuffle-color:--primary]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          onClick={toggleShuffleOn}
          aria-label={`${shuffleOn ? "Disable" : "Enable"} shuffle`}
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
          onClick={() => {}}
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
          onClick={toggleIsPlaying}
          aria-label={isPlaying ? `Pause ${""}` : `Play ${""}`}
        >
          {isPlaying
            ? <PauseIcon
                className="h-5 w-5"
                stroke="hsl(var(--background))"
                fill="hsl(var(--background))"
              />
            : <PlayIcon
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
          onClick={() => {}}
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
            repeatState === "off"
              ? "[--repeat-color:--muted-foreground] hover:[--repeat-color:--primary]"
              : "[--repeat-color:--green]",
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent"
          )}
          onClick={updateRepeatState}
          aria-label={repeatState === "track"
            ? "Turn off repeat"
            : `Set repeat to ${repeatState === "off" ? "context" : "track"}`
          }
        >
          {repeatState === "track"
            ? <Repeat1Icon className="h-5 w-5" stroke="hsl(var(--repeat-color))"/>
            : <RepeatIcon className="h-5 w-5" stroke="hsl(var(--repeat-color))" />
          }
        </Button>
      </div>
      <SeekSlider current_ms={100000} duration_ms={202000} />
    </div>
  );
}
