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

type View = "list" | "compact";
type ViewVisibilityState = {
  title: boolean;
  artist: boolean;
  "title/artist": boolean;
};

const COLUMN_VISIBILITIES: Record<View, ViewVisibilityState> = {
  list: { title: false, artist: false, "title/artist": true },
  compact: { title: true, artist: true, "title/artist": false },
} as const;

export default function TrackTable({
  trackDataArr,
  playlist,
}: TrackTableProps) {
  const [view, setView] = useState<View>("compact");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<ViewVisibilityState>(
    COLUMN_VISIBILITIES.compact
  );

  const toggleSort = (label?: string) => () =>
    setSorting(
      label
        ? [{ id: label, desc: !(sorting[0]?.id !== label || sorting[0]?.desc) }]
        : []
    );

  const updateView = (newView: View) => {
    if (newView !== view) {
      setView(newView);
      setColumnVisibility(COLUMN_VISIBILITIES[newView]);
    }
  };

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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
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
              <TableRow key={headerGroup.id} className="hover:bg-inherit">
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
