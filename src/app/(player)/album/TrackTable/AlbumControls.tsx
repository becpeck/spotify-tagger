"use client";

import { useState } from "react";

import {
  AlignJustifyIcon,
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  HeartIcon,
  LayoutListIcon,
  ListMusicIcon,
  MonitorIcon,
  PlusIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import PlayPauseButton from "@/components/buttons/PlayPauseButton";
import ShuffleButton from "@/components/buttons/ShuffleButton";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type AlbumControlsProps = {
  name: string;
  type: "album";
  id: string;
  is_saved: boolean;
  uri: `spotify:album:${string}`;
  view: "list" | "compact";
  updateView: (newView: "list" | "compact") => void;
};

export default function AlbumControls({
  name,
  type,
  id,
  is_saved,
  uri,
  view,
  updateView,
}: AlbumControlsProps) {
  const { player, playbackState } = useAppStore(
    ({ player, playbackState }) => ({ player, playbackState })
  );
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isSaved, setIsSaved] = useState(is_saved);

  const playMutation = trpc.playback.playWithContext.useMutation();
  const shuffleMutation = trpc.playback.toggleShuffle.useMutation();
  const followMutation = trpc.albums.saveAlbums.useMutation({
    onMutate: () => setIsSaved(true),
    onError: () => setIsSaved(false),
  });
  const unfollowMutation = trpc.albums.unsaveAlbums.useMutation({
    onMutate: () => setIsSaved(false),
    onError: () => setIsSaved(true),
  });

  const isPlaybackContext = playbackState?.context.uri === uri;
  const isPlaying = isPlaybackContext && !playbackState.paused;

  // Reconcile shuffle state
  if (isPlaybackContext && shuffleOn !== playbackState.shuffle) {
    setShuffleOn(playbackState.shuffle);
  }

  const toggleIsSaved = async () => {
    // UI: Add toasts for failed requests
    if (isSaved) {
      await unfollowMutation.mutateAsync([id]);
    } else {
      await followMutation.mutateAsync([id]);
    }
  };

  const toggleIsPlaying = async () => {
    if (!isPlaybackContext) {
      if (shuffleOn !== playbackState!.shuffle) {
        await shuffleMutation.mutateAsync({ state: shuffleOn });
      }
      await playMutation.mutateAsync({ context: { uri } });
    } else {
      if (isPlaying) {
        await player!.pause.bind(player)();
      } else {
        await player!.resume.bind(player)();
      }
    }
  };

  const toggleShuffleOn = async () => {
    if (isPlaybackContext) {
      await shuffleMutation.mutateAsync({ state: !shuffleOn });
    } else {
      setShuffleOn(!shuffleOn);
    }
  };

  return (
    <div className="flex justify-between m-4">
      <div className="flex items-center gap-4">
        <PlayPauseButton
          isPlaying={isPlaying}
          disabled={!player || !playbackState}
          onClick={toggleIsPlaying}
          aria-label={isPlaying ? `Pause ${name}` : `Play ${name}`}
        />
        <ShuffleButton
          disabled={!playbackState}
          isShuffleOn={shuffleOn}
          onClick={toggleShuffleOn}
          aria-label={`${shuffleOn ? "Disable" : "Enable"} shuffle for ${name}`}
        />
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
          <HeartIcon
            className={cn(
              "h-6 w-6",
              isSaved
                ? "text-green-500"
                : "text-muted-foreground hover:text-primary"
            )}
            {...(isSaved ? { fill: "currentColor" } : {})}
          />
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
                <HeartIcon
                  size={18}
                  className={cn(isSaved ? "text-green-500" : "")}
                  {...(isSaved ? { fill: "currentColor" } : {})}
                />
                {isSaved ? "Remove from Your Library" : "Save to Your Library"}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" disabled>
                <ListMusicIcon size={18} />
                Add to Queue
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" disabled>
                <PlusIcon size={18} />
                Add to Playlist
                {/* TODO: add way to add all album tracks to playlist */}
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
                Copy Album Link
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 capitalize">
            {view}
            {view === "list" ? (
              <LayoutListIcon size={18} />
            ) : (
              <AlignJustifyIcon size={18} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            View as
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={cn(
                "flex justify-between gap-4",
                view === "compact" && "text-green-500 focus:text-green-500"
              )}
              onClick={() => updateView("compact")}
            >
              <div className="flex gap-2">
                <AlignJustifyIcon size={18} />
                Compact
              </div>
              {view === "compact" ? <CheckIcon size={18} /> : null}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "flex justify-between gap-4",
                view === "list" && "text-green-500 focus:text-green-500"
              )}
              onClick={() => updateView("list")}
            >
              <div className="flex gap-2">
                <LayoutListIcon size={18} />
                List
              </div>
              {view === "list" ? <CheckIcon size={18} /> : null}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
