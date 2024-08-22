import { createColumnHelper } from "@tanstack/react-table";
import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { NumberHeader, NumberCell } from "@/app/(player)/playlist/TrackTable/columns/numberColumn";
import { TitleHeader, TitleCell } from "@/app/(player)/playlist/TrackTable/columns/titleColumn";
import { ArtistHeader, ArtistCell } from "@/app/(player)/playlist/TrackTable/columns/artistColumn";
import { AlbumHeader, AlbumCell } from "@/app/(player)/playlist/TrackTable/columns/albumColumn";
import { DateHeader, DateCell } from "@/app/(player)/playlist/TrackTable/columns/dateAddedColumn";
import { IsSavedCell } from "@/app/(player)/playlist/TrackTable/columns/isSavedColumn";
import { DurationHeader, DurationCell } from "@/app/(player)/playlist/TrackTable/columns/durationColumn";
import { ActionsCell } from "@/app/(player)/playlist/TrackTable/columns/actionsColumn";

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
  columnHelper.accessor(row => row.artists.map((artist) => artist.name).join(", "), {
    id: "artist",
    sortingFn: "text",
    filterFn: "includesString",
    header: ArtistHeader,
    cell: ArtistCell,
  }),
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
