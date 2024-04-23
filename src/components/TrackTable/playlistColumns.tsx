import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
 
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type Data = { id: string, type: string, name: string };

export type Track = {
  number: number;
  track: Data,
  artists: Array<Data>,
  album: Data,
  added_at: string;
  duration_ms: number;
};

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
    header: () => (<div className="text-right">#</div>),
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue("number")}
      </div>
    ),
  },
  {
    accessorKey: "track",
    header: "Title",
    cell: ({ row }) => (
      <div>
        {(row.getValue("track") satisfies Data).name}
      </div>
    ),
  },
  {
    accessorKey: "artists",
    header: "Artist",
    cell: ({ row }) => (
      <>
        {(row.getValue("artists") satisfies Data[]).map(artist => (
          <div key={artist.id}>{artist.name}</div>
        ))}
      </>
    ),
  },
  {
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => (
      <div>
        {(row.getValue("album") satisfies Data).name}
      </div>
    ),
  },
  {
    accessorKey: "added_at",
    header: "Date Added",
    cell: ({ row }) => (
      <div>
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
    header: () => (<div className="text-right">Duration</div>),
    cell: ({ row }) => (
      <div className="text-right">
        {stringifyDuration(parseInt(row.getValue("duration_ms")))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
              <DropdownMenuItem>Save to Liked Songs</DropdownMenuItem>
              <DropdownMenuItem>Add to Queue</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Go to Artist</DropdownMenuItem>
              <DropdownMenuItem>Go to Album</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];
