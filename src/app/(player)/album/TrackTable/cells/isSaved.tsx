import { type CellContext } from "@tanstack/react-table";
import { HeartIcon } from "lucide-react";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function IsSavedCell(props: CellContext<AlbumTrack, unknown>) {
  const { isSaved, toggleIsSaved } = props as ExtendedCellContext<
    AlbumTrack,
    unknown
  >;
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
        isSaved
          ? "text-green-500 hover:text-green-500"
          : "text-background group-hover/row:text-muted-foreground group-hover/row:hover:text-primary"
      )}
      onClick={toggleIsSaved}
      aria-label={isSaved ? "Remove from Liked Songs" : "Save to Liked Songs"}
    >
      <HeartIcon
        className="h-4 w-4"
        {...(isSaved ? { fill: "currentColor" } : {})}
      />
    </Button>
  );
}
