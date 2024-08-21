import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { HashIcon, PlayIcon, PauseIcon } from "lucide-react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/stores/AppStoreProvider";

function NumberCell(props: CellContext<TrackData, number>) {
  const { row, isPlaybackContext } = props as ExtendedCellContext<
    TrackData,
    number
  >;
  const { playbackState } = useAppStore(({ playbackState }) => ({
    playbackState,
  }));
  const isPlaying = isPlaybackContext && !playbackState!.paused;
  const Icon = isPlaying ? PauseIcon : PlayIcon;
  return (
    <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
      <div
        className={cn(
          "group-hover/row:hidden tabular-nums text-base",
          isPlaybackContext && "text-green-500"
        )}
      >
        {row.original.number}
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
}

const numberColumn: ColumnDef<TrackData, number> = {
  accessorKey: "number",
  enableGlobalFilter: false,
  header: () => (
    <div className="w-full flex justify-center align-center">
      <span className="sr-only">Track Number</span>
      <HashIcon size={15} />
    </div>
  ),
  cell: (context) => <NumberCell {...context} />,
};

export default numberColumn;
