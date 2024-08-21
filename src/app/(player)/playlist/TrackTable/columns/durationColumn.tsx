import { type ColumnDef } from "@tanstack/react-table";
import { ClockIcon } from "lucide-react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import { toDuration, toDurationString } from "@/utils/timeUtils";

const durationColumn: ColumnDef<TrackData, number> = {
  accessorKey: "duration_ms",
  enableGlobalFilter: false,
  sortDescFirst: false,
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        className="px-0 gap-2 w-full justify-end hover:bg-inherit"
        onClick={() => column.toggleSorting()}
      >
        <ColumnSortIcon sorting={column.getIsSorted()} />
        <span className="sr-only">Duration</span>
        <ClockIcon size={15} />
      </Button>
    );
  },
  cell: ({ row }) => {
    const duration = toDuration(row.getValue("duration_ms") satisfies number);
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
  },
};

export default durationColumn;
