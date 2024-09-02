import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";

export function DateHeader({ column }: HeaderContext<PlaylistTrack, Date>) {
  return (
    <Button
      variant="ghost"
      className="p-0 gap-2 justify-start hover:bg-inherit hidden view-compact:@5xl:inline-flex view-list:@3xl:inline-flex"
      onClick={() => column.toggleSorting()}
    >
      Date Added
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function DateCell({ row }: CellContext<PlaylistTrack, Date>) {
  return (
    <div className="text-muted-foreground hidden view-compact:@5xl:block view-list:@3xl:block">
      {(row.getValue("added_at") satisfies Date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  );
}
