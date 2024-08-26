import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

export function AlbumHeader({ column }: HeaderContext<TrackData, string>) {
  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit hidden view-compact:@3xl:inline-flex view-list:@xl:inline-flex"
      onClick={() => column.toggleSorting()}
    >
      Album
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function AlbumCell({ row, table }: CellContext<TrackData, string>) {
  const { id, name, type } = row.original.album;
  return (
    <Link
      href={`/${type}/${id}`}
      className="group-hover/row:text-primary hidden view-compact:@3xl:line-clamp-1 view-list:@xl:inline-flex"
    >
      <SearchHighlight
        text={name}
        search={[table.getState().globalFilter as string]}
      />
    </Link>
  );
}
