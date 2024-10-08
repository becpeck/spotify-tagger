import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";

import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link, { linkVariants } from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

import { cn } from "@/lib/utils";

export function TitleHeader({ column }: HeaderContext<PlaylistTrack, string>) {
  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Title
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function TitleCell(props: CellContext<PlaylistTrack, string>) {
  const { row, table, isPlaybackContext } = props as ExtendedCellContext<
    PlaylistTrack,
    string
  >;
  const { id, name, type } = row.original;
  if (row.original.is_local) {
    return (
      <span
        className={cn(
          linkVariants({ size: "base", color: "primary" }),
          "hover:no-underline cursor-default"
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
}
