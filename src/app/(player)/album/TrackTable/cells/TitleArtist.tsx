import { type CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/TrackTable/TrackTableRow";
import Link from "@/components/Link";

export function TitleArtistCell(props: CellContext<AlbumTrack, unknown>) {
  const { row, isPlaybackContext } = props as ExtendedCellContext<
    AlbumTrack,
    string
  >;
  const { id, name, type, artists } = row.original;
  return (
    <div className="flex items-center gap-4 h-16">
      <div className="flex flex-col">
        <Link
          color={isPlaybackContext ? "green" : "primary"}
          size="base"
          href={`/${type}/${id}`}
        >
          {name}
        </Link>
        <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
          {artists.map(({ id, name, type }, i) => (
            <Fragment key={id}>
              <Link
                href={`/${type}/${id}`}
                number="list"
                className="group-hover/row:text-primary"
              >
                {name}
              </Link>
              {i < artists.length - 1 ? ", " : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
