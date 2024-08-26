import Image from "next/image";
import { type HeaderContext, type CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";
// import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

export function TitleArtistHeader(props: HeaderContext<TrackData, unknown>) {
  // const { columns } = props.column;
  console.log(props);
  return (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      // onClick={() => column.toggleSorting()}
    >
      TitleArtist
      {/* <ColumnSortIcon sorting={column.getIsSorted()} /> */}
    </Button>
  );
}

export function TitleArtistCell(props: CellContext<TrackData, unknown>) {
  const { row, table, isPlaybackContext } = props as ExtendedCellContext<
    TrackData,
    string
  >;
  const {
    track: { id, name, type },
    artists,
    imageUrl,
  } = row.original;
  return (
    <div className="flex items-center gap-4">
      <Image
        className="my-3 rounded-sm w-10 h-10"
        src={imageUrl}
        alt={`${name} cover`}
        width={40}
        height={40}
      />
      <div className="flex flex-col">
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
      </div>
    </div>
  );
}
