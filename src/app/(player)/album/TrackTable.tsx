"use client";

import { Fragment } from "react";
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
import { DiscIcon } from "lucide-react";

import useView from "@/lib/hooks/useView";
import columns from "@/app/(player)/album/TrackTable/trackColumns";
import AlbumControls from "@/app/(player)/album/TrackTable/AlbumControls";
import TrackTableRow from "@/app/(player)/album/TrackTable/TrackTableRow";

import { cn } from "@/lib/utils";

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
  album: {
    artists: {
      id: string;
      name: string;
    }[];
    id: string;
    images: {
      url: string;
      height: number | null;
      width: number | null;
    }[];
    is_saved: boolean;
    name: string;
    type: "album";
    uri: `spotify:album:${string}`;
  };
};

export default function TrackTable({ tracks, album }: TrackTableProps) {
  const { view, columnVisibility, updateView, onColumnVisibilityChange } =
    useView("compact");

  const table = useReactTable({
    data: tracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange,
    state: {
      columnVisibility,
    },
  });

  const isMultiDisc = tracks[tracks.length - 1]!.disc_number > 1;

  return (
    <>
      <AlbumControls album={album} view={view} updateView={updateView} />
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
              table.getRowModel().rows.map((row, i) => (
                <Fragment key={row.id}>
                  {isMultiDisc &&
                  (i === 0 ||
                    row.original.disc_number !== tracks[i - 1]!.disc_number) ? (
                    <TableRow className="bg-muted/30 hover:bg-muted/30 h-9">
                      <TableHead className="flex justify-center items-center">
                        <DiscIcon size={18} />
                      </TableHead>
                      <TableHead className="font-semibold">
                        Disc {row.original.disc_number}
                      </TableHead>
                    </TableRow>
                  ) : null}
                  <TrackTableRow row={row} album={album} />
                </Fragment>
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
