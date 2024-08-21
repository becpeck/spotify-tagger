"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-grid";
import {
  type RowData,
  type TableMeta,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  numberColumn,
  titleColumn,
  artistColumn,
  albumColumn,
  dateAddedColumn,
  isSavedColumn,
  durationColumn,
  actionsColumn,
} from "@/app/(player)/playlist/TrackTable/columns";

import PlaylistControls from "@/app/(player)/playlist/TrackTable/PlaylistControls";
import TrackTableRow from "@/app/(player)/playlist/TrackTable/TrackTableRow";

export interface TrackData {
  number: number;
  track: {
    id: string;
    type: "track";
    name: string;
    uri: `spotify:track:${string}`;
  };
  artists: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  album: {
    id: string;
    type: string;
    name: string;
  };
  added_at: Date;
  duration_ms: number;
  isSaved: boolean;
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    playlist?: {
      id: string;
      name: string;
      type: "playlist";
      uri: `spotify:playlist:${string}`;
      isFollowing: boolean;
    };
    userPlaylists: Array<{
      id: string;
      name: string;
    }>;
  }
}

const columns = [
  numberColumn,
  titleColumn,
  artistColumn,
  albumColumn,
  dateAddedColumn,
  isSavedColumn,
  durationColumn,
  actionsColumn,
];

type TrackTableProps = {
  trackDataArr: TrackData[];
  playlist: TableMeta<TrackData>["playlist"];
};

export default function TrackTable({
  trackDataArr,
  playlist,
}: TrackTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const toggleSort = (label?: string) => () =>
    setSorting(
      label
        ? [{ id: label, desc: !(sorting[0]?.id !== label || sorting[0]?.desc) }]
        : []
    );

  const table = useReactTable({
    data: trackDataArr,
    columns,
    meta: {
      playlist,
      userPlaylists: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Playlist ${i + 1}`, // PLACRHOLDER for saved playlists store
      })),
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    },
  });

  const gridTemplateCols = "grid-cols-[auto_2fr_1.5fr_1.5fr_auto_auto_auto_auto]";
  const colSpan = "col-span-8";

  return (
    <>
      <PlaylistControls
        name={playlist!.name}
        type={playlist!.type}
        id={playlist!.id}
        uri={playlist!.uri}
        isFollowing={playlist!.isFollowing} // PLACEHOLDER for saved playlists store
        sorting={sorting}
        toggleSort={toggleSort}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table className="border" gridTemplateCols={gridTemplateCols}>
        <TableHeader colSpan={colSpan}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              colSpan={colSpan}
              className="hover:bg-inherit"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody colSpan={colSpan}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TrackTableRow
                key={row.id}
                row={row}
                colSpan={colSpan}
                trackData={row.original}
                playlistUri={playlist!.uri}
              />
            ))
          ) : (
            <TableRow colSpan={colSpan} className="block">
              <TableCell className="h-24 justify-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
