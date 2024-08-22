import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

export function ArtistHeader({ column }: HeaderContext<TrackData, string>) {
  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Artist
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function ArtistCell({ row, table }: CellContext<TrackData, string>) {
  const artists = row.original.artists satisfies TrackData["artists"];
  return (
    <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
      {artists.map(({ id, name, type }, i) => (
        <Fragment key={id}>
          <Link
            href={`/${type}/${id}`}
            number="list"
            className="group-hover/row:text-primary"
          >
            <SearchHighlight
              text={name}
              search={[table.getState().globalFilter as string]}
            />
          </Link>
          {i < artists.length - 1 ? ", " : null}
        </Fragment>
      ))}
    </div>
  );
}
