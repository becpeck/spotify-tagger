"use client";

import { useState, useEffect } from "react";
import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import {
  toDuration,
  toDurationString,
  type DurationFormat,
} from "@/utils/timeUtils";

type SeekSliderProps = {
  disabled: WebPlaybackState["disallows"]["seeking"];
  duration_ms: WebPlaybackState["duration"];
  paused: WebPlaybackState["paused"];
  position_ms: WebPlaybackState["position"];
  seek: SpotifyPlayer["seek"];
};

export default function SeekSlider(props: SeekSliderProps) {
  const { disabled, duration_ms, paused, position_ms, seek } = props;
  const [position, setPosition] = useState(position_ms);

  useEffect(() => {
    setPosition(position_ms);
  }, [position_ms]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!paused) {
      interval = setInterval(() => {
        setPosition((p) => p + 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paused]);

  const duration = toDuration(duration_ms);

  const durationFormat: DurationFormat = {
    ...(duration.hours > 0
      ? { hours: "numeric", minutes: "2-digit" }
      : { minutes: "numeric", seconds: "2-digit" }),
    separator: ":",
  };

  const handleChangeSeekPosition = ([value]: number[]) => setPosition(value!);

  const handleCommitSeekPosition = async ([value]: number[]) =>
    await seek(value!);

  return (
    <div className="flex justify-between items-center gap-2 group/seek w-full text-muted-foreground text-xs leading-none">
      <div>{toDurationString(position, durationFormat)}</div>
      <Slider
        value={[position]}
        onValueChange={handleChangeSeekPosition}
        onValueCommit={handleCommitSeekPosition}
        min={0}
        max={duration_ms}
        step={1000}
        disabled={disabled}
        className="group-hover/seek:cursor-pointer"
      >
        <SliderTrack className="h-1">
          <SliderRange className="group-hover/seek:bg-green-500 rounded-full" />
        </SliderTrack>
        <SliderThumb className="bg-transparent group-hover/seek:bg-primary border-none focus-visible:ring-transparent h-3 w-3" />
      </Slider>
      <div>{toDurationString(duration, durationFormat)}</div>
    </div>
  );
}
