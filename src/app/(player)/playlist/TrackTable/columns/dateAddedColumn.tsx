import { type ColumnDef } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";

const dateAddedColumn: ColumnDef<TrackData, Date> = {
  accessorKey: "added_at",
  sortingFn: "datetime",
  sortDescFirst: false,
  enableGlobalFilter: false,
  header: ({ column }) => (
    <Button
      variant="ghost"
      className="p-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Date Added
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  ),
  cell: ({ row }) => (
    <div className="text-muted-foreground">
      {(row.getValue("added_at") satisfies Date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  ),
};

export default dateAddedColumn;
