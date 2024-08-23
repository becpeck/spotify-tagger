import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";

export function DateHeader({ column }: HeaderContext<TrackData, Date>) {
  return (
    <Button
      variant="ghost"
      className="p-0 gap-2 justify-start hover:bg-inherit col-date hidden @5xl:inline-flex"
      onClick={() => column.toggleSorting()}
    >
      Date Added
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function DateCell({ row }: CellContext<TrackData, Date>) {
  return (
    <div className="text-muted-foreground col-date hidden @5xl:block">
      {(row.getValue("added_at") satisfies Date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  );
}
