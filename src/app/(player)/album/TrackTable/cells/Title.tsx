import { type CellContext } from "@tanstack/react-table";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/album/TrackTable/TrackTableRow";
import Link from "@/components/Link";

export const TitleHeader = () => <div>Title</div>;

export function TitleCell(props: CellContext<AlbumTrack, string>) {
  const { row, isPlaybackContext } = props as ExtendedCellContext<
    AlbumTrack,
    string
  >;
  const { id, name, type } = row.original;
  return (
    <Link
      color={isPlaybackContext ? "green" : "primary"}
      size="base"
      href={`/${type}/${id}`}
    >
      {name}
    </Link>
  );
}
