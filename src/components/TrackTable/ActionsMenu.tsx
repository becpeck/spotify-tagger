import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type Data } from "@/components/TrackTable/playlistColumns";

type ActionsMenuProps = {
  album: Data;
  artists: Data[];
  playlist: Data;
  track: Data;
};

export default function ActionsMenu({
  album,
  artists,
  playlist,
  track,
}: ActionsMenuProps) {
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
          {artists.length === 1 ? (
            <DropdownMenuItem>
              <Link href={`/${artists[0]?.type}/${artists[0]?.id}`}>
                Go to Artist
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Go to Artist</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {artists.map((artist) => (
                    <DropdownMenuItem key={artist.id}>
                      <Link href={`/${artist.type}/${artist.id}`}>
                        {artist.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          <DropdownMenuItem>
            <Link
              href={`/${album.type}/${album.id}?highlight=spotify:track:${track.id}`}
            >
              Go to Album
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a
              href={`https://open.spotify.com/${track.type}/${track.id}`}
              target="_blank"
            >
              Open in Spotify
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href={`spotify:${track.type}:${track.id}?context=spotify:${playlist.type}:${playlist.id}`}
              target="_blank"
            >
              Open in Desktop App
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
