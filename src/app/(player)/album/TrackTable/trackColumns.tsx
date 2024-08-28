import { createColumnHelper } from "@tanstack/react-table";
import { type AlbumTrack } from "@/app/(player)/album/TrackTable";

import { NumberHeader, NumberCell } from "@/app/(player)/album/trackTable/cells/Number";
import { TitleHeader, TitleCell } from "@/app/(player)/album/trackTable/cells/Title";

import { ArtistHeader, ArtistCell } from "@/app/(player)/album/trackTable/cells/Artist";
import { IsSavedCell } from "@/app/(player)/album/trackTable/cells/isSaved";
import { DurationHeader, DurationCell } from "@/app/(player)/album/trackTable/cells/Duration";
import { ActionsCell } from "@/app/(player)/album/trackTable/cells/Actions";

const columnHelper = createColumnHelper<AlbumTrack>();

const columns = [
  columnHelper.accessor("track_number", {
    enableGlobalFilter: false,
    header: NumberHeader,
    cell: NumberCell,
  }),
  // columnHelper.accessor(row => [row.track.name].concat(row.artists.map((artist => artist.name))).join(", "), {
  //   id: "title/artist",
  //   filterFn: "includesString",
  //   header: TitleArtistHeader,
  //   cell: TitleArtistCell,
  // }),
  columnHelper.accessor("name", {
    id: "title",
    header: TitleHeader,
    cell: TitleCell,
  }),
  columnHelper.accessor(
    (row) => row.artists.map((artist) => artist.name).join(", "),
    {
      id: "artist",
      header: ArtistHeader,
      cell: ArtistCell,
    }
  ),
  columnHelper.display({
    id: "isSaved",
    cell: IsSavedCell,
  }),
  columnHelper.accessor("duration_ms", {
    header: DurationHeader,
    cell: DurationCell,
  }),
  columnHelper.display({
    id: "actions",
    cell: ActionsCell,
  }),
];

export default columns;