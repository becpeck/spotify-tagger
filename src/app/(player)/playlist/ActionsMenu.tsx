"use client";

import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { 
  DiscIcon,
  ListMusicIcon,
  PlusIcon,
  CirclePlusIcon,
  CopyIcon,
  ExternalLinkIcon,
  UserRoundIcon,
  MonitorIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

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
import { type Data } from "@/app/(player)/playlist/PlaylistTable";

type ActionsMenuProps = {
  album: Data,
  artists: Data[],
  playlist: Data,
  track: Data,
  userPlaylists: Array<Omit<Data, "type">>,
};

export default function ActionsMenu({
  album,
  artists,
  playlist,
  track,
  userPlaylists,
}: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="text-[hsl(var(--primary))] hidden group-hover/row:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-2">
              <PlusIcon size={18} />
              Add to Playlist
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {userPlaylists.map(playlist => (
                  <DropdownMenuItem key={playlist.id}>{playlist.name}</DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex gap-2">
            <CirclePlusIcon size={18}/>
            Save to Liked Songs
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <ListMusicIcon size={18}/>
            Add to Queue
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {artists.length === 1 ? (
            <DropdownMenuItem className="flex gap-2" asChild>
              <Link href={`/${artists[0]?.type}/${artists[0]?.id}`}>
                  <UserRoundIcon size={18}/>
                  Go to Artist
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex gap-2">
                <UserRoundIcon size={18} />
                Go to Artist
              </DropdownMenuSubTrigger>
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
          <DropdownMenuItem className="flex gap-2" asChild>
            <Link
              href={`/${album.type}/${album.id}?highlight=spotify:track:${track.id}`}
            >
              <DiscIcon size={18} />
              Go to Album
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2" onClick={() => {navigator.clipboard.writeText(`https://open.spotify.com/${track.type}/${track.id}`)}}>
            <CopyIcon size={18} />
            Copy Song Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-2">
              <FontAwesomeIcon icon={faSpotify} className="h-[18px] w-[18px]"/>
              Open in Spotify
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex gap-2" asChild>
                  <a
                    href={`https://open.spotify.com/${track.type}/${track.id}`}
                    target="_blank"
                  >
                    <ExternalLinkIcon size={18}/>
                    Spotify Web
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2" asChild>
                  <a
                    href={`spotify:${track.type}:${track.id}?context=spotify:${playlist.type}:${playlist.id}`}
                    target="_blank"
                  >
                    <MonitorIcon size={18} />
                    Desktop App
                  </a>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
