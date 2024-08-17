import { type ColumnDef } from "@tanstack/react-table";
import { HashIcon, PlayIcon, PauseIcon } from "lucide-react";
import { type Track } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const numberColumn: ColumnDef<Track, number> = {
  accessorKey: "number",
  enableGlobalFilter: false,
  header: () => (
    <div className="w-full flex justify-center align-center">
      <span className="sr-only">Track Number</span>
      <HashIcon size={15} />
    </div>
  ),
  cell: ({ row }) => {
    const { isPlaybackContext, isPlaying, number } = row.original;
    const Icon = isPlaying ? PauseIcon : PlayIcon;
    return (
      <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
        <div
          className={cn(
            "group-hover/row:hidden tabular-nums text-base",
            isPlaybackContext && "text-green-500"
          )}
        >
          {number}
        </div>
        <div className="hidden group-hover/row:block">
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          <Icon
            size={15}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary))"
          />
        </div>
      </Button>
    );
  },
};

export default numberColumn;
