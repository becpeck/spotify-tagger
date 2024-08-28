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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TrackTableRow from "@/app/(player)/album/trackTable/TrackTableRow";

import { cn } from "@/lib/utils";

type View = "list" | "compact";

export interface AlbumTrack {
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  id: string;
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

type TrackTableProps = {
  tracks: AlbumTrack[];
  album: { id: string; name: string; uri: `spotify:album:${string}` };
};

export default function TrackTable({ tracks, album }: TrackTableProps) {
  const [view, setView] = useState<View>("compact");

  const table = useReactTable({
    data: tracks,
    columns: [],
    meta: {
      userPlaylists: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Playlist ${i + 1}`, // PLACRHOLDER for saved playlists store
      })),
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const updateView = (newView: View) => {
    if (newView !== view) {
      setView(newView);
    }
  };

  return (
    <div className="border @container">
      <Table
        className={cn(
          "grid-cols-album",
          view === "compact" && "view-compact @xl:grid-cols-album-exp",
          view === "list" && "view-list"
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
                <TrackTableRow key={row.id} row={row} album={album} />
              ))
          ) : (
            <TableRow className="block">
              <TableCell className="h-24 justify-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
