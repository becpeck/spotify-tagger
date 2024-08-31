import { type CellContext } from "@tanstack/react-table";
import { ClockIcon } from "lucide-react";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { toDuration, toDurationString } from "@/utils/timeUtils";

export function DurationHeader() {
  return (
    <div className="flex justify-end items-center w-full">
      <span className="sr-only">Duration</span>
      <ClockIcon size={15} />
    </div>
  );
}

export function DurationCell({ row }: CellContext<AlbumTrack, number>) {
  const duration = toDuration(row.original.duration_ms);
  return (
    <div className="w-full text-right text-muted-foreground tabular-nums">
      {toDurationString(duration, {
        ...(duration.hours > 0
          ? { hours: "numeric", minutes: "2-digit" }
          : { minutes: "numeric" }),
        seconds: "2-digit",
        separator: ":",
      })}
    </div>
  );
}
