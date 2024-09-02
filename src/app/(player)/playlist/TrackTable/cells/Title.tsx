import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

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
  const { id, name, type } = row.original.track;
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
