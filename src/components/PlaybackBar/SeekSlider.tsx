"use client";

import { useState } from "react";
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
  duration_ms: number,
  current_ms: number,
};

export default function SeekSlider({
  duration_ms,
  current_ms,
}: SeekSliderProps) {
  const duration = toDuration(duration_ms);
  const durationFormat: DurationFormat = {
    ...(duration.hours > 0
      ? { hours: "numeric", minutes: "2-digit" }
      : { minutes: "numeric", seconds: "2-digit" }),
    separator: ":",
  };

  const [seekPosition, setSeekPosition] = useState(current_ms);

  const handleChangeSeekPosition = ([value]: number[]) => setSeekPosition(value!);

  const handleCommitSeekPosition = ([value]: number[]) => {
    // api call
  };

  return (
    <div className="flex justify-between items-center gap-2 group/seek w-full text-muted-foreground text-xs h-full">
      <div>{toDurationString(seekPosition, durationFormat)}</div>
      <Slider
        value={[seekPosition]}
        onValueChange={handleChangeSeekPosition}
        onValueCommit={handleCommitSeekPosition}
        min={0}
        max={duration_ms}
        step={1000}
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
