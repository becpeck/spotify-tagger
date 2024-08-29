"use client";

import { useState } from "react";
import { type SortingState } from "@tanstack/react-table";

import {
  AlignJustifyIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CirclePlusIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  LayoutListIcon,
  ListMusicIcon,
  MonitorIcon,
  PauseIcon,
  PlayIcon,
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

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ShuffleButton from "@/components/buttons/ShuffleButton";

type PlaylistControlsProps = {
  name: string;
  type: "playlist";
  id: string;
  uri: `spotify:playlist:${string}`;
  isFollowing: boolean;
  sorting: SortingState;
  toggleSort: (label?: string) => () => void;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  view: "list" | "compact";
  updateView: (newView: "list" | "compact") => void;
};

export default function PlaylistControls({
  name,
  type,
  id,
  uri,
  isFollowing,
  sorting,
  toggleSort,
  globalFilter,
  setGlobalFilter,
  view,
  updateView,
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
      if (shuffleOn !== playbackState.shuffle) {
        await shuffleMutation.mutateAsync({ state: shuffleOn });
      }
      await playMutation.mutateAsync({ context: { uri } });
    } else {
      if (isPlaying) {
        await player.pause.bind(player)();
      } else {
        await player.resume.bind(player)();
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
