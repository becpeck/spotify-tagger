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

import useView from "@/lib/hooks/useView";
import columns from "@/app/(player)/playlist/TrackTable/trackColumns";

import PlaylistControls from "@/app/(player)/playlist/TrackTable/PlaylistControls";
import TrackTableRow from "@/app/(player)/playlist/TrackTable/TrackTableRow";

import { cn } from "@/lib/utils";

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
  imageUrl: string;
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

type TrackTableProps = {
  trackDataArr: TrackData[];
  playlist: TableMeta<TrackData>["playlist"];
};

export default function TrackTable({
  trackDataArr,
  playlist,
}: TrackTableProps) {
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
        name={playlist!.name}
        type={playlist!.type}
        id={playlist!.id}
        uri={playlist!.uri}
        isFollowing={playlist!.isFollowing} // PLACEHOLDER for saved playlists store
        sorting={sorting}
        toggleSort={toggleSort}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        view={view}
        updateView={updateView}
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
                  <TrackTableRow
                    key={row.id}
                    row={row}
                    trackData={row.original}
                    playlistUri={playlist!.uri}
                  />
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
