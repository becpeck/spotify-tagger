"use client";

import { useState } from "react";
import { type SortingState } from "@tanstack/react-table";

import {
  AlignJustifyIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  HeartIcon,
  LayoutListIcon,
  ListMusicIcon,
  MonitorIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import { Input } from "@/components/ui/input";
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
import ShuffleButton from "@/components/buttons/ShuffleButton";
import PlayPauseButton from "@/components/buttons/PlayPauseButton";
import HeartButton from "@/components/buttons/HeartButton";
import MoreOptionsButton from "@/components/buttons/MoreOptionsButton";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type PlaylistControlsProps = {
  name: string;
  type: "playlist";
  id: string;
  uri: `spotify:playlist:${string}`;
  isFollowing: boolean;
  view: "list" | "compact";
  updateView: (newView: "list" | "compact") => void;
  sorting: SortingState;
  toggleSort: (label?: string) => () => void;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

export default function PlaylistControls({
  name,
  type,
  id,
  uri,
  isFollowing,
  view,
  updateView,
  sorting,
  toggleSort,
  globalFilter,
  setGlobalFilter,
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

  const isPlaybackContext = playbackState?.context.uri === uri;
  const isPlaying = isPlaybackContext && !playbackState.paused;

  // Reconcile shuffle state
  if (isPlaybackContext && shuffleOn !== playbackState.shuffle) {
    setShuffleOn(playbackState.shuffle);
  }

  const toggleIsSaved = async () => {
    // UI: Add toasts for failed requests
    if (isSaved) {
      await unfollowPlaylistMutation.mutateAsync(id);
    } else {
      await followPlaylistMutation.mutateAsync(id);
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

  const sortingLabel = ((sorting: SortingState) => {
    if (sorting.length === 0 || !sorting[0]) {
      return "Custom Order";
    } else {
      switch (sorting[0].id) {
        case "title":
          return "Title";
        case "artist":
          return "Artist";
        case "album":
          return "Album";
        case "added_at":
          return "Date Added";
        case "duration_ms":
          return "Duration";
      }
    }
  })(sorting);

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
        <HeartButton
          isSaved={isSaved}
          onClick={toggleIsSaved}
          aria-label={isSaved ? "Remove from Library" : "Save to Library"}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreOptionsButton aria-label={`More options for ${name}`} />
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
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search"
          className="max-w-40"
          value={globalFilter}
          onChange={(evt) => setGlobalFilter(evt.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {sortingLabel}
              {view === "list" ? (
                <LayoutListIcon size={18} />
              ) : (
                <AlignJustifyIcon size={18} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4 [--icon-color:--background] focus:[--icon-color:--muted-background]",
                  sorting.length === 0 &&
                    "text-green-500 focus:text-green-500 [--icon-color:--green] focus:[--icon-color:--green]"
                )}
                onClick={toggleSort()}
              >
                Custom Order
                <CheckIcon size={18} stroke="hsl(var(--icon-color))" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4",
                  sorting[0]?.id === "title" &&
                    "text-green-500 focus:text-green-500"
                )}
                onClick={toggleSort("title")}
              >
                Title
                {sorting[0]?.id === "title" ? (
                  sorting[0]?.desc ? (
                    <ArrowDownIcon size={18} />
                  ) : (
                    <ArrowUpIcon size={18} />
                  )
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4",
                  sorting[0]?.id === "artist" &&
                    "text-green-500 focus:text-green-500"
                )}
                onClick={toggleSort("artist")}
              >
                Artist
                {sorting[0]?.id === "artist" ? (
                  sorting[0]?.desc ? (
                    <ArrowDownIcon size={18} />
                  ) : (
                    <ArrowUpIcon size={18} />
                  )
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4",
                  sorting[0]?.id === "album" &&
                    "text-green-500 focus:text-green-500"
                )}
                onClick={toggleSort("album")}
              >
                Album
                {sorting[0]?.id === "album" ? (
                  sorting[0]?.desc ? (
                    <ArrowDownIcon size={18} />
                  ) : (
                    <ArrowUpIcon size={18} />
                  )
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4",
                  sorting[0]?.id === "added_at" &&
                    "text-green-500 focus:text-green-500"
                )}
                onClick={toggleSort("added_at")}
              >
                Date Added
                {sorting[0]?.id === "added_at" ? (
                  sorting[0]?.desc ? (
                    <ArrowDownIcon size={18} />
                  ) : (
                    <ArrowUpIcon size={18} />
                  )
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "flex justify-between gap-4",
                  sorting[0]?.id === "duration_ms" &&
                    "text-green-500 focus:text-green-500"
                )}
                onClick={toggleSort("duration_ms")}
              >
                Duration
                {sorting[0]?.id === "duration_ms" ? (
                  sorting[0]?.desc ? (
                    <ArrowDownIcon size={18} />
                  ) : (
                    <ArrowUpIcon size={18} />
                  )
                ) : null}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
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
    </div>
  );
}
