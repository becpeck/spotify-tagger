import { type ColumnDef } from "@tanstack/react-table";
import { type Track } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

const albumColumn: ColumnDef<Track, string> = {
  id: "album",
  sortingFn: "text",
  filterFn: "includesString",
  accessorFn: (row) => row.album.name,
  header: ({ column }) => (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Album
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  ),
  cell: ({ row, table }) => {
    const { id, name, type } = row.original.album;
    return (
      <Link href={`/${type}/${id}`} className="group-hover/row:text-primary">
        <SearchHighlight
          text={name}
          search={[table.getState().globalFilter as string]}
        />
      </Link>
    );
  },
};

export default albumColumn;
