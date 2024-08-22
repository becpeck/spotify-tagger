import { createColumnHelper } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import {
  NumberHeader,
  NumberCell,
} from "@/app/(player)/playlist/TrackTable/cells/Number";
import {
  TitleHeader,
  TitleCell,
} from "@/app/(player)/playlist/TrackTable/cells/Title";
import {
  ArtistHeader,
  ArtistCell,
} from "@/app/(player)/playlist/TrackTable/cells/Artist";
import {
  AlbumHeader,
  AlbumCell,
} from "@/app/(player)/playlist/TrackTable/cells/Album";
import {
  DateHeader,
  DateCell,
} from "@/app/(player)/playlist/TrackTable/cells/Date";
import { IsSavedCell } from "@/app/(player)/playlist/TrackTable/cells/IsSaved";
import {
  DurationHeader,
  DurationCell,
} from "@/app/(player)/playlist/TrackTable/cells/Duration";
import { ActionsCell } from "@/app/(player)/playlist/TrackTable/cells/Actions";

const columnHelper = createColumnHelper<TrackData>();

export const compactColumns = [
  columnHelper.accessor("number", {
    enableGlobalFilter: false,
    header: NumberHeader,
    cell: NumberCell,
  }),
  columnHelper.accessor("track.name", {
    id: "title",
    sortingFn: "text",
    filterFn: "includesString",
    header: TitleHeader,
    cell: TitleCell,
  }),
  columnHelper.accessor(
    (row) => row.artists.map((artist) => artist.name).join(", "),
    {
      id: "artist",
      sortingFn: "text",
      filterFn: "includesString",
      header: ArtistHeader,
      cell: ArtistCell,
    }
  ),
  columnHelper.accessor("album.name", {
    id: "album",
    sortingFn: "text",
    filterFn: "includesString",
    header: AlbumHeader,
    cell: AlbumCell,
  }),
  columnHelper.accessor("added_at", {
    sortingFn: "datetime",
    sortDescFirst: false,
    enableGlobalFilter: false,
    header: DateHeader,
    cell: DateCell,
  }),
  columnHelper.accessor("isSaved", {
    enableGlobalFilter: false,
    cell: IsSavedCell,
  }),
  columnHelper.accessor("duration_ms", {
    enableGlobalFilter: false,
    sortDescFirst: false,
    header: DurationHeader,
    cell: DurationCell,
  }),
  columnHelper.display({
    id: "actions",
    enableGlobalFilter: false,
    cell: ActionsCell,
  }),
];