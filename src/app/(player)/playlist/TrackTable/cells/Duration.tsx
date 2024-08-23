import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { ClockIcon } from "lucide-react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import { toDuration, toDurationString } from "@/utils/timeUtils";

export function DurationHeader({ column }: HeaderContext<TrackData, number>) {
  return (
    <Button
      variant="ghost"
      className="px-0 gap-2 w-full justify-end hover:bg-inherit col-duration"
      onClick={() => column.toggleSorting()}
    >
      <ColumnSortIcon sorting={column.getIsSorted()} />
      <span className="sr-only">Duration</span>
      <ClockIcon size={15} />
    </Button>
  );
}

export function DurationCell({ row }: CellContext<TrackData, number>) {
  const duration = toDuration(row.getValue("duration_ms"));
  return (
    <div className="w-full text-right text-muted-foreground tabular-nums col-duration">
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
