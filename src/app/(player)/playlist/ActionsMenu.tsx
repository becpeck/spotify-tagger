"use client";

import Link from "next/link";
import {
  EllipsisIcon,
  DiscIcon,
  ListMusicIcon,
  PlusIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  UserRoundIcon,
  MonitorIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

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

type ActionsMenuProps = {
  album: {
    id: string;
    name: string;
    type: string;
  };
  artists: {
    id: string;
    name: string;
    type: string;
  }[];
  playlist: {
    id: string;
    name: string;
    type: "playlist";
  };
  track: {
    id: string;
    name: string;
    type: "track";
    uri: `spotify:track:${string}`;
    isSaved: boolean;
  };
  userPlaylists: Array<{ id: string; name: string }>;
  addToQueue: () => Promise<void>;
  toggleIsSaved: () => Promise<void>;
};

export default function ActionsMenu({
  album,
  artists,
  playlist,
  track,
  userPlaylists,
  addToQueue,
  toggleIsSaved,
}: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 [--ellipsis-color:--background] group-hover/row:[--ellipsis-color:--primary]"
        >
          <span className="sr-only">Open menu</span>
          <EllipsisIcon
            className="h-4 w-4"
            stroke="hsl(var(--ellipsis-color))"
          />
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
                {userPlaylists.map((playlist) => (
                  <DropdownMenuItem key={playlist.id}>
                    {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex gap-2" onClick={toggleIsSaved}>
            <div
              className={cn(
                "flex justify-center items-center rounded-full h-4 w-4",
                track.isSaved
                  ? "bg-green-500"
                  : "border border-[hsl(var(--plus-color))]"
              )}
            >
              {track.isSaved ? (
                <CheckIcon
                  className="h-[66%] w-[66%] stroke-[14%]"
                  stroke="hsl(var(--background))"
                />
              ) : (
                <PlusIcon className="h-[66%] w-[66%] stroke-[14%]" />
              )}
            </div>
            {track.isSaved ? "Remove From Liked Songs" : "Save to Liked Songs"}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2" onClick={addToQueue}>
            <ListMusicIcon size={18} />
            Add to Queue
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {artists.length === 1 ? (
            <DropdownMenuItem className="flex gap-2" asChild>
              <Link href={`/${artists[0]?.type}/${artists[0]?.id}`}>
                <UserRoundIcon size={18} />
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
          <DropdownMenuItem
            className="flex gap-2"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `https://open.spotify.com/${track.type}/${track.id}`
              );
            }}
          >
            <CopyIcon size={18} />
            Copy Song Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-2">
              <FontAwesomeIcon icon={faSpotify} className="h-[18px] w-[18px]" />
              Open in Spotify
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex gap-2" asChild>
                  <a
                    href={`https://open.spotify.com/${track.type}/${track.id}`}
                    target="_blank"
                  >
                    <ExternalLinkIcon size={18} />
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
