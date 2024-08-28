import { type CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import Link from "@/components/Link";

export const ArtistHeader = () => <div className="hidden view-compact:@xl:block">Artist</div>;

export function ArtistCell({ row }: CellContext<AlbumTrack, string>) {
  const { artists } = row.original;
  return (
    <div className="text-muted-foreground truncate whitespace-normal break-all hidden view-compact:@xl:line-clamp-1">
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
  );
}
