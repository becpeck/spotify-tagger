import { type CellContext } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import HeartButton from "@/components/buttons/HeartButton";
import { cn } from "@/lib/utils";

export function IsSavedCell(props: CellContext<TrackData, boolean>) {
  const { isSaved, toggleIsSaved } = props as ExtendedCellContext<
    TrackData,
    boolean
  >;
  return (
    <HeartButton
      size="sm"
      className={cn(
        !isSaved &&
          "text-background group-hover/row:text-muted-foreground group-hover/row:hover:text-primary"
      )}
      isSaved={isSaved}
      onClick={toggleIsSaved}
      aria-label={isSaved ? "Remove from Liked Songs" : "Save to Liked Songs"}
    />
  );
}
