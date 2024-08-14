"use client";

import { useState } from "react";

import {
  CheckIcon,
  CirclePlusIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  ListMusicIcon,
  MonitorIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ShuffleIcon,
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

import { useAppStore } from "@/stores/AppStoreProvider";
import { trpc } from "@/trpc/client";
import { cn } from "@/lib/utils";

type PlaylistControlsProps = {
  name: string;
  type: "playlist";
  id: string;
  uri: `spotify:playlist:${string}`;
  isFollowing: boolean;
};

export default function PlaylistControls({
  name,
  type,
  id,
  uri,
  isFollowing,
}: PlaylistControlsProps) {
  const { player, playbackState } = useAppStore(
    ({ player, playbackState }) => ({ player, playbackState })
  );
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isSaved, setIsSaved] = useState(isFollowing);

  const playMutation = trpc.playback.playWithContext.useMutation();
  const shuffleMutation = trpc.playback.toggleShuffle.useMutation();
  const followPlaylistMutation = trpc.playlist.followPlaylist.useMutation({
    onMutate: () => setIsSaved(true),
    onError: () => setIsSaved(false),
  });
  const unfollowPlaylistMutation = trpc.playlist.unfollowPlaylist.useMutation({
    onMutate: () => setIsSaved(false),
    onError: () => setIsSaved(true),
  });

  if (!player || !playbackState) {
    return;
  }

  const isPlaybackContext = playbackState.context.uri === uri;
  const isPlaying = isPlaybackContext && !playbackState.paused;

  // Reconcile shuffle state
  if (isPlaybackContext && shuffleOn !== playbackState.shuffle) {
    setShuffleOn(playbackState.shuffle);
  }

  const toggleIsSaved = () => {
    // UI: Add toasts for failed requests
    if (isSaved) {
      unfollowPlaylistMutation.mutate(id);
    } else {
      followPlaylistMutation.mutate(id);
    }
  };

  const toggleIsPlaying = async () => {
    if (!isPlaybackContext) {
      if (shuffleOn !== playbackState.shuffle) {
        shuffleMutation.mutate({ state: shuffleOn });
      }
      playMutation.mutate({ context: { uri } });
    } else {
      if (isPlaying) {
        await player.pause.bind(player)();
      } else {
        await player.resume.bind(player)();
      }
    }
  };

  const toggleShuffleOn = () => {
    if (isPlaybackContext) {
      shuffleMutation.mutate({ state: !shuffleOn });
    } else {
      setShuffleOn(!shuffleOn);
    }
  };

  return (
    <div className="flex items-center gap-4 m-4">
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-green-500 hover:bg-green-500 h-10 w-10 hover:transform hover:scale-105 active:transform-none active:brightness-75"
        onClick={toggleIsPlaying}
        aria-label={isPlaying ? `Pause ${""}` : `Play ${""}`}
      >
        {isPlaying ? (
          <PauseIcon
            className="h-5 w-5"
            stroke="hsl(var(--background))"
            fill="hsl(var(--background))"
          />
        ) : (
          <PlayIcon
            className="h-5 w-5"
            stroke="hsl(var(--background))"
            fill="hsl(var(--background))"
          />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
          shuffleOn
            ? "[--shuffle-color:--green]"
            : "[--shuffle-color:--muted-foreground] hover:[--shuffle-color:--primary]"
        )}
        onClick={toggleShuffleOn}
        aria-label={`${shuffleOn ? "Disable" : "Enable"} shuffle for ${name}`}
      >
        <ShuffleIcon className="h-6 w-6" stroke="hsl(var(--shuffle-color))" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
          "[--plus-color:--muted-foreground] hover:[--plus-color:--primary]"
        )}
        onClick={toggleIsSaved}
        aria-label={isSaved ? "Remove from Library" : "Save to Library"}
      >
        <div
          className={cn(
            "flex justify-center items-center rounded-full h-6 w-6",
            isSaved
              ? "bg-green-500"
              : "border-2 border-[hsl(var(--plus-color))]"
          )}
        >
          {isSaved ? (
            <CheckIcon
              className="h-4 w-4 stroke-[12%]"
              stroke="hsl(var(--background))"
            />
          ) : (
            <PlusIcon
              className="h-4 w-4 stroke-[12%]"
              stroke="hsl(var(--plus-color))"
            />
          )}
        </div>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent [--ellipsis-color:--muted-foreground] hover:[--ellipsis-color:--primary]"
            aria-label={`More options for ${name}`}
          >
            <EllipsisIcon
              className="h-6 w-6"
              stroke="hsl(var(--ellipsis-color))"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2" onClick={toggleIsSaved}>
              {isSaved ? (
                <>
                  <div className="flex justify-center items-center rounded-full h-[18px] w-[18px] bg-green-500">
                    <CheckIcon
                      size={12}
                      strokeWidth={3}
                      stroke="hsl(var(--background))"
                    />
                  </div>
                  Remove from Your Library
                </>
              ) : (
                <>
                  <CirclePlusIcon size={18} />
                  Save to Your Library
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2" disabled>
              <ListMusicIcon size={18} />
              Add to Queue
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `https://open.spotify.com/${type}/${id}`
                );
              }}
            >
              <CopyIcon size={18} />
              Copy Playlist Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex gap-2">
                <FontAwesomeIcon icon={faSpotify} size={"lg"} />
                Open in Spotify
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <a
                      href={`https://open.spotify.com/${type}/${id}`}
                      target="_blank"
                    >
                      <ExternalLinkIcon size={18} />
                      Spotify Web
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <a href={`spotify:${type}:${id}`} target="_blank">
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
    </div>
  );
}
