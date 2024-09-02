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
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import useView from "@/lib/hooks/useView";
import columns from "@/app/(player)/playlist/TrackTable/trackColumns";

import PlaylistControls from "@/app/(player)/playlist/TrackTable/PlaylistControls";
import TrackTableRow from "@/app/(player)/playlist/TrackTable/TrackTableRow";

import { cn } from "@/lib/utils";

export interface PlaylistTrack {
  added_at: Date;
  album: {
    id: string;
    name: string;
    type: "album";
  };
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  duration_ms: number;
  explicit: boolean;
  id: string;
  imageUrl: string;
  is_local: boolean;
  is_playable: boolean | undefined;
  is_saved: boolean;
  name: string;
  restrictions:
    | {
        reason: string;
      }
    | undefined;
  track_number: number;
  type: "track";
  uri: `spotify:track:${string}`;
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    userPlaylists: Array<{
      id: string;
      name: string;
    }>;
  }
}

type TrackTableProps = {
  tracks: PlaylistTrack[];
  playlist: {
    id: string;
    is_saved: boolean;
    name: string;
    type: "playlist";
    uri: `spotify:playlist:${string}`;
  };
};

export default function TrackTable({ tracks, playlist }: TrackTableProps) {
  const { view, columnVisibility, updateView, onColumnVisibilityChange } =
    useView("compact");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const toggleSort = (label?: string) => () =>
    setSorting(
      label
        ? [{ id: label, desc: !(sorting[0]?.id !== label || sorting[0]?.desc) }]
        : []
    );

  const table = useReactTable({
    data: tracks,
    columns,
    meta: {
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
    onColumnVisibilityChange,
    state: {
      globalFilter,
      sorting,
      columnVisibility: columnVisibility,
    },
  });

  return (
    <>
      <PlaylistControls
        {...playlist}
        view={view}
        updateView={updateView}
        sorting={sorting}
        toggleSort={toggleSort}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="border @container">
        <Table
          className={cn(
            view === "compact" &&
              "view-compact grid-cols-playlist-compact-sm @xl:grid-cols-playlist-compact-md @3xl:grid-cols-playlist-compact-lg @5xl:grid-cols-playlist-compact-xl",
            view === "list" &&
              "view-list grid-cols-playlist-list-sm @xl:grid-cols-playlist-list-md @3xl:grid-cols-playlist-list-lg"
          )}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/30 hover:bg-muted/30 h-9"
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TrackTableRow key={row.id} row={row} playlist={playlist} />
                ))
            ) : (
              <TableRow className="block">
                <TableCell className="h-24 justify-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
