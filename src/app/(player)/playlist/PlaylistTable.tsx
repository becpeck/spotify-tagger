"use client";

import {
  type ColumnDef,
  type RowData,
  type TableMeta,
} from "@tanstack/react-table";
import { PlayIcon, HashIcon, ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "@/components/Link";
import ActionsMenu from "@/app/(player)/playlist/ActionsMenu";
import { toDurationString, toDuration } from "@/utils/timeUtils";
import DataTable from "@/components/ui/data-table";

export type Data = { id: string; type: string; name: string };

export type Track = {
  number: number;
  track: Data;
  artists: Array<Data>;
  album: Data;
  added_at: string;
  duration_ms: number;
};

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    playlist?: Data;
    userPlaylists: Array<Omit<Data, "type">>;
  }
}

const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "number",
    header: () => (
      <div className="w-full flex justify-center align-center">
        <span className="sr-only">Track Number</span>
        <HashIcon size={15} />
      </div>
    ),
    cell: ({ row }) => (
      <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
        <div className="group-hover/row:hidden tabular-nums">
          {row.getValue("number")}
        </div>
        <div className="hidden group-hover/row:block">
          <span className="sr-only">Play</span>
          <PlayIcon
            size={15}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary))"
          />
        </div>
      </Button>
    ),
  },
  {
    accessorKey: "track",
    header: "Title",
    cell: ({ row }) => {
      const { id, name, type } = row.getValue("track") satisfies Data;
      return (
        <Link color="primary" size="base" href={`/${type}/${id}`}>
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "artists",
    header: "Artist",
    cell: ({ row }) => {
      const artists = row.getValue("artists") satisfies Data[];
      return (
        <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
          {artists.map(({ id, name, type }, i) => (
            <>
              <Link
                key={id}
                href={`/${type}/${id}`}
                number="list"
                className="group-hover/row:text-primary"
              >
                {name}
              </Link>
              {i < artists.length - 1 ? ", " : null}
            </>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => {
      const { id, name, type } = row.getValue("album") satisfies Data;
      return (
        <Link href={`/${type}/${id}`} className="group-hover/row:text-primary">
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "added_at",
    header: "Date Added",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {new Date(String(row.getValue("added_at"))).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}
      </div>
    ),
  },
  {
    accessorKey: "duration_ms",
    header: () => (
      <div className="w-full flex justify-end align-center">
        <span className="sr-only">Duration</span>
        <ClockIcon size={15} />
      </div>
    ),
    cell: ({ row }) => {
      const duration = toDuration(parseInt(row.getValue("duration_ms")));
      return (
        <div className="w-full text-right text-muted-foreground tabular-nums">
          {toDurationString(duration, {
            ...(duration.hours > 0
              ? { hours: "numeric", minutes: "2-digit" }
              : { minutes: "numeric" }),
            seconds: "2-digit",
            separator: ":",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const { album, artists, track } = row.original;
      const playlist = table.options.meta!.playlist!;
      const userPlaylists = table.options.meta!.userPlaylists;
      return (
        <ActionsMenu
          artists={artists}
          album={album}
          track={track}
          playlist={playlist}
          userPlaylists={userPlaylists}
        />
      );
    },
  },
];

type PlaylistTableProps = {
  data: Track[];
  meta: TableMeta<Track>;
};

export default function PlaylistTable({ data, meta }: PlaylistTableProps) {
  return <DataTable data={data} meta={meta} columns={columns} />;
}
