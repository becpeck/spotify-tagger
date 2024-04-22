import { ColumnDef } from "@tanstack/react-table";

type Data = { id: string, type: string, name: string };

export type Track = {
  number: number;
  track: Data,
  artists: Array<Data>,
  album: Data,
  added_at: string;
  duration_ms: number;
};

export const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "number",
    header: "#"
  },
  {
    accessorKey: "track",
    header: "Title",
  },
  {
    accessorKey: "artists",
    header: "Artist",
  },
  {
    accessorKey: "album",
    header: "Album",
  },
  {
    accessorKey: "added_at",
    header: "Date Added",
  },
  {
    accessorKey: "duration_ms",
    header: "Duration",
  },
];
