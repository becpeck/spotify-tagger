import { type ColumnDef } from "@tanstack/react-table";
import { type Track } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

const titleColumn: ColumnDef<Track, string> = {
  id: "title",
  sortingFn: "text",
  filterFn: "includesString",
  accessorFn: (row) => row.track.name,
  header: ({ column }) => (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Title
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  ),
  cell: ({ row, table }) => {
    const {
      isPlaybackContext,
      track: { id, name, type },
    } = row.original;
    return (
      <Link
        color={isPlaybackContext ? "green" : "primary"}
        size="base"
        href={`/${type}/${id}`}
      >
        <SearchHighlight
          text={name}
          search={[table.getState().globalFilter as string]}
        />
      </Link>
    );
  },
};

export default titleColumn;
