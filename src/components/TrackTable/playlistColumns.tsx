import { type ColumnDef, type RowData } from "@tanstack/react-table";
import { PlayIcon, HashIcon, ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import TableLink from "@/components/TrackTable/TableLink";
import ActionsMenu from "@/components/TrackTable/ActionsMenu";

export type Data = { id: string, type: string, name: string };

export type Track = {
  number: number,
  track: Data,
  artists: Array<Data>,
  album: Data,
  added_at: string,
  duration_ms: number,
};

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    playlist?: Data,
    userPlaylists: Array<Omit<Data, "type">>,
  }
}

function stringifyDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  return `${hours ? `${hours}:` : ''}`
    + `${hours ? String(minutes).padStart(2, '0') : minutes}:`
    + `${String(seconds).padStart(2, '0')}`;
}

export const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "number",
    header: () => (
      <div className="flex justify-center align-center">
        <span className="sr-only">Track Number</span>
        <HashIcon size={15} />
      </div>
    ),
    cell: ({ row }) => (
      <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
        <div className="group-hover/row:hidden">{row.getValue("number")}</div>
        <div className="hidden group-hover/row:block">
          <span className="sr-only">Play</span>
          <PlayIcon size={15} fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
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
        <TableLink href={`/${type}/${id}`}>{name}</TableLink>
      );
    },
  },
  {
    accessorKey: "artists",
    header: "Artist",
    cell: ({ row }) => {
      const artists = row.getValue("artists") satisfies Data[];
      return (
        <div>
          {artists.map(({ id, name, type }, i) => (
            <>
              {i > 0 ? ', ' : null}
              <TableLink 
                key={id} 
                href={`/${type}/${id}`}
                className="text-muted-foreground group-hover/row:text-primary"
              >{name}</TableLink>
            </>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => {
      const { id, name, type } = row.getValue("album") satisfies Data;
      return (
        <TableLink
          href={`/${type}/${id}`}
          className="text-muted-foreground group-hover/row:text-primary"
        >{name}</TableLink>
      );
    }
  },
  {
    accessorKey: "added_at",
    header: "Date Added",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {(new Date(String(row.getValue("added_at")))).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "duration_ms",
    header: () => (
      <div className="flex justify-center align-center">
        <span className="sr-only">Duration</span>
        <ClockIcon size={15} />
      </div>
      ),
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground">
        {stringifyDuration(parseInt(row.getValue("duration_ms")))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const { album, artists, track } = row.original;
      const playlist = table.options.meta!.playlist!;
      const userPlaylists = table.options.meta!.userPlaylists!;
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
  }
];
