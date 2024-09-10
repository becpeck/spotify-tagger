import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";

import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link, { linkVariants } from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

import { cn } from "@/lib/utils";

export function AlbumHeader({ column }: HeaderContext<PlaylistTrack, string>) {
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

export function AlbumCell({ row, table }: CellContext<PlaylistTrack, string>) {
  const { id, name, type } = row.original.album;
  if (row.original.is_local) {
    return (
      <span
        className={cn(
          linkVariants(),
          "hover:no-underline cursor-default hidden view-compact:@3xl:line-clamp-1 view-list:@xl:line-clamp-1"
        )}
      >
        <SearchHighlight
          text={name}
          search={[table.getState().globalFilter as string]}
        />
      </span>
    );
  }
  return (
    <Link
      href={`/${type}/${id}`}
      className="group-hover/row:text-primary hidden view-compact:@3xl:line-clamp-1 view-list:@xl:line-clamp-1"
    >
      <SearchHighlight
        text={name}
        search={[table.getState().globalFilter as string]}
      />
    </Link>
  );
}
