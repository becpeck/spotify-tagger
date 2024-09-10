import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";

import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link, { linkVariants } from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

import { cn } from "@/lib/utils";

export function ArtistHeader({ column }: HeaderContext<PlaylistTrack, string>) {
  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit hidden view-compact:@xl:inline-flex"
      onClick={() => column.toggleSorting()}
    >
      Artist
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  );
}

export function ArtistCell({ row, table }: CellContext<PlaylistTrack, string>) {
  const { artists } = row.original;
  return (
    <div className="text-muted-foreground truncate whitespace-normal break-all hidden view-compact:@xl:line-clamp-1">
      {row.original.artists.map(({ id, name, type }, i) => (
        <Fragment key={id ? id : name}>
          {row.original.is_local ? (
            <span
              className={cn(
                linkVariants(),
                "hover:no-underline cursor-default"
              )}
            >
              <SearchHighlight
                text={name}
                search={[table.getState().globalFilter as string]}
              />
            </span>
          ) : (
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
          )}
          {i < artists.length - 1 ? ", " : null}
        </Fragment>
      ))}
    </div>
  );
}
