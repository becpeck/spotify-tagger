import Image from "next/image";
import { Fragment } from "react";
import { type HeaderContext, type CellContext } from "@tanstack/react-table";

import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";

import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import TrackImagePlaceholder from "@/components/images/TrackImagePlaceholder";
import Link, { linkVariants } from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

import { cn } from "@/lib/utils";

export function TitleArtistHeader({
  table,
}: HeaderContext<PlaylistTrack, unknown>) {
  const toggleSorting = () => {
    const sorting = table.getState().sorting;
    switch (true) {
      case sorting[0]?.id === "title" && sorting[0].desc:
      case sorting[0]?.id === "artist" && !sorting[0].desc:
      case sorting[0]?.id === "artist" && sorting[0].desc:
        table.getColumn("artist")?.toggleSorting();
        break;
      case sorting[0]?.id === "title" && !sorting[0].desc:
      default:
        table.getColumn("title")?.toggleSorting();
    }
  };

  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => toggleSorting()}
    >
      {table.getState().sorting[0]?.id === "artist" ? "Artist" : "Title"}
      <ColumnSortIcon
        sorting={
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          table.getColumn("title")?.getIsSorted() ||
          table.getColumn("artist")!.getIsSorted()
        }
      />
    </Button>
  );
}

export function TitleArtistCell(props: CellContext<PlaylistTrack, unknown>) {
  const { row, table, isPlaybackContext } = props as ExtendedCellContext<
    PlaylistTrack,
    string
  >;
  const { id, name, type, artists, imageUrl } = row.original;
  return (
    <div className="flex items-center gap-4 title-artist">
      {imageUrl ? (
        <Image
          className="my-3 rounded-sm w-10 h-10"
          src={imageUrl}
          alt={`${name} cover`}
          width={40}
          height={40}
        />
      ) : (
        <TrackImagePlaceholder className={cn("my-3 rounded-sm w-10 h-10")} />
      )}
      <div className="flex flex-col">
        {row.original.is_local ? (
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
        ) : (
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
        )}
        <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
          {artists.map(({ id, name, type }, i) => (
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
      </div>
    </div>
  );
}
