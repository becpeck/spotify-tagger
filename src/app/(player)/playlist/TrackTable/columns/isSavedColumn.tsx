import { type ColumnDef } from "@tanstack/react-table";
import { CheckIcon, PlusIcon } from "lucide-react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const isSavedColumn: ColumnDef<TrackData, boolean> = {
  id: "isSaved",
  enableGlobalFilter: false,
  header: () => null,
  cell: (context) => {
    const { isSaved, toggleIsSaved } = context as ExtendedCellContext<
      TrackData,
      boolean
    >;
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
          "[--plus-color:--background] group-hover/row:[--plus-color:--muted-foreground] group-hover/row:hover:[--plus-color:--primary]"
        )}
        onClick={toggleIsSaved}
        aria-label={isSaved ? "Remove from Library" : "Save to Library"}
      >
        <div
          className={cn(
            "flex justify-center items-center rounded-full h-4 w-4",
            isSaved ? "bg-green-500" : "border border-[hsl(var(--plus-color))]"
          )}
        >
          {isSaved ? (
            <CheckIcon
              className="h-[66%] w-[66%] stroke-[14%]"
              stroke="hsl(var(--background))"
            />
          ) : (
            <PlusIcon
              className="h-[66%] w-[66%] stroke-[14%]"
              stroke="hsl(var(--plus-color))"
            />
          )}
        </div>
      </Button>
    );
  },
};

export default isSavedColumn;
