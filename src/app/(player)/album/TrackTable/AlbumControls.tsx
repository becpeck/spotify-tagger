"use client";

import { useState } from "react";

import {
  AlignJustifyIcon,
  CheckIcon,
  CopyIcon,
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
import HeartButton from "@/components/buttons/HeartButton";
import MoreOptionsButton from "@/components/buttons/MoreOptionsButton";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

type AlbumControlsProps = {
  album: {
    artists: {
      id: string;
      name: string;
    }[];
    id: string;
    images: {
      url: string;
      height: number | null;
      width: number | null;
    }[];
    is_saved: boolean;
    name: string;
    type: "album";
    uri: `spotify:album:${string}`;
  };
  view: "list" | "compact";
  updateView: (newView: "list" | "compact") => void;
};

export default function AlbumControls({
  album,
  view,
  updateView,
}: AlbumControlsProps) {
  const { id, name, type, is_saved, uri, images, artists } = album;
  const { player, playbackState, addUserAlbum, removeUserAlbum } = useAppStore(
    (state) => ({
      player: state.player,
      playbackState: state.playbackState,
      addUserAlbum: state.addUserAlbum,
      removeUserAlbum: state.removeUserAlbum,
    })
  );
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isSaved, setIsSaved] = useState(is_saved);

  const playMutation = trpc.playback.playWithContext.useMutation();
  const shuffleMutation = trpc.playback.toggleShuffle.useMutation();
  const saveMutation = trpc.albums.saveAlbums.useMutation({
    onMutate: () => {
      setIsSaved(true);
      addUserAlbum({ id, name, type, uri, images, artists });
    },
    onError: () => {
      setIsSaved(false);
      removeUserAlbum(id);
    },
  });
  const unsaveMutation = trpc.albums.unsaveAlbums.useMutation({
    onMutate: () => {
      setIsSaved(false);
      removeUserAlbum(id);
    },
    onError: () => {
      setIsSaved(true);
      addUserAlbum({ id, name, type, uri, images, artists });
    },
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
      await unsaveMutation.mutateAsync([id]);
    } else {
      await saveMutation.mutateAsync([id]);
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
