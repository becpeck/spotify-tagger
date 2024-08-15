"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type RowData,
  type TableMeta,
} from "@tanstack/react-table";
import {
  PlayIcon,
  HashIcon,
  ClockIcon,
  PauseIcon,
  CheckIcon,
  PlusIcon,
} from "lucide-react";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Link from "@/components/Link";
import ActionsMenu from "@/app/(player)/playlist/ActionsMenu";
import PlaylistControls from "@/app/(player)/playlist/PlaylistControls";

import { useAppStore } from "@/stores/AppStoreProvider";
import { toDurationString, toDuration } from "@/utils/timeUtils";
import { cn } from "@/lib/utils";

export interface TrackData {
  number: number;
  track: {
    id: string;
    type: "track";
    name: string;
    uri: `spotify:track:${string}`;
  };
  artists: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  album: {
    id: string;
    type: string;
    name: string;
  };
  added_at: string;
  duration_ms: number;
  isSaved: boolean;
}

export interface Track extends TrackData {
  isPlaybackContext: boolean;
  isPlaying: boolean;
  addToQueue: () => Promise<undefined>;
  toggleIsSaved: () => Promise<void>;
  toggleIsPlaying: () => Promise<void>;
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    playlist?: {
      id: string;
      name: string;
      type: "playlist";
      uri: `spotify:playlist:${string}`;
      isFollowing: boolean;
    };
    userPlaylists: Array<{
      id: string;
      name: string;
    }>;
  }
}

const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "number",
    header: () => (
      <div className="w-full flex justify-center align-center">
        <span className="sr-only">Track Number</span>
        <HashIcon size={15} />
      </div>
    ),
    cell: ({ row }) => {
      const { isPlaybackContext, isPlaying } = row.original;
      const Icon = isPlaying ? PauseIcon : PlayIcon;
      return (
        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
          <div
            className={cn(
              "group-hover/row:hidden tabular-nums text-base",
              isPlaybackContext && "text-green-500"
            )}
          >
            {row.getValue("number")}
          </div>
          <div className="hidden group-hover/row:block">
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            <Icon
              size={15}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--primary))"
            />
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "track",
    header: "Title",
    cell: ({ row }) => {
      const { id, name, type } = row.getValue("track") satisfies Track["track"];
      return (
        <Link
          color={row.original.isPlaybackContext ? "green" : "primary"}
          size="base"
          href={`/${type}/${id}`}
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "artists",
    header: "Artist",
    cell: ({ row }) => {
      const artists = row.getValue("artists") satisfies Track["artists"];
      return (
        <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
          {artists.map(({ id, name, type }, i) => (
            <>
              <Link
                key={id}
                href={`/${type}/${id}`}
                number="list"
                className="group-hover/row:text-primary"
              >
                {name}
              </Link>
              {i < artists.length - 1 ? ", " : null}
            </>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => {
      const { id, name, type } = row.getValue("album") satisfies Track["album"];
      return (
        <Link href={`/${type}/${id}`} className="group-hover/row:text-primary">
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "added_at",
    header: "Date Added",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {new Date(String(row.getValue("added_at"))).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}
      </div>
    ),
  },
  {
    id: "isSaved",
    header: () => <div></div>,
    cell: ({ row }) => {
      const { isSaved, toggleIsSaved } = row.original;
      return (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
            "[--plus-color:--background] group-hover/row:[--plus-color:--muted-foreground] group-hover/row:hover:[--plus-color:--primary]"
          )}
          onClick={toggleIsSaved}
          aria-label={isSaved ? "Remove from Library" : "Save to Library"}
        >
          <div
            className={cn(
              "flex justify-center items-center rounded-full h-4 w-4",
              isSaved
                ? "bg-green-500"
                : "border border-[hsl(var(--plus-color))]"
            )}
          >
            {isSaved ? (
              <CheckIcon
                className="h-[66%] w-[66%] stroke-[14%]"
                stroke="hsl(var(--background))"
              />
            ) : (
              <PlusIcon
                className="h-[66%] w-[66%] stroke-[14%]"
                stroke="hsl(var(--plus-color))"
              />
            )}
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "duration_ms",
    header: () => (
      <div className="w-full flex justify-end align-center">
        <span className="sr-only">Duration</span>
        <ClockIcon size={15} />
      </div>
    ),
    cell: ({ row }) => {
      const duration = toDuration(parseInt(row.getValue("duration_ms")));
      return (
        <div className="w-full text-right text-muted-foreground tabular-nums">
          {toDurationString(duration, {
            ...(duration.hours > 0
              ? { hours: "numeric", minutes: "2-digit" }
              : { minutes: "numeric" }),
            seconds: "2-digit",
            separator: ":",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const { album, artists, track, isSaved, toggleIsSaved } = row.original;
      const playlist = table.options.meta!.playlist!;
      const userPlaylists = table.options.meta!.userPlaylists;
      return (
        <ActionsMenu
          artists={artists}
          album={album}
          track={{...track, isSaved}}
          playlist={playlist}
          userPlaylists={userPlaylists}
          toggleIsSaved={toggleIsSaved}
        />
      );
    },
  },
];

type PlaylistTableProps = {
  trackDataArr: TrackData[];
  playlist: TableMeta<Track>["playlist"];
};

export default function PlaylistTable({
  trackDataArr,
  playlist,
}: PlaylistTableProps) {
  const { player, playbackState } = useAppStore(
    ({ player, playbackState }) => ({ player, playbackState })
  );
  const [savedTrackIds, setSavedTrackIds] = useState(
    new Set(
      trackDataArr
        .filter((trackData) => trackData.isSaved)
        .map((trackData) => trackData.track.id)
    )
  );

  const addOrDeleteTrackIds =
    (addOrDelete: "add" | "delete") => (trackIds: string[]) => {
      const ids = new Set(savedTrackIds);
      trackIds.forEach((id) => ids[addOrDelete](id));
      setSavedTrackIds(ids);
    };

  const playMutation = trpc.playback.playWithContext.useMutation();
  const saveTracksMutation = trpc.me.saveTracks.useMutation({
    onMutate: (trackIds) => addOrDeleteTrackIds("add")(trackIds),
    onError: (error, trackIds) => addOrDeleteTrackIds("delete")(trackIds),
  });
  const unsaveTracksMutation = trpc.me.unsaveTracks.useMutation({
    onMutate: (trackIds) => addOrDeleteTrackIds("delete")(trackIds),
    onError: (error, trackIds) => addOrDeleteTrackIds("add")(trackIds),
  });

  if (!playbackState || !player) {
    return;
  }

  const { context } = playbackState;
  const { name, album, uri } = playbackState.track_window.current_track;

  const tracks: Track[] = trackDataArr.map((trackData) => {
    const isPlaybackContext =
      context.uri === playlist!.uri &&
      (uri === trackData.track.uri ||
        (name === trackData.track.name && album.name === trackData.album.name));
    // && artists.every(artist => artists)
    const isPlaying = isPlaybackContext && !playbackState.paused;

    const addToQueue = async () => undefined;

    const toggleIsSaved = async () => {
      if (savedTrackIds.has(trackData.track.id)) {
        unsaveTracksMutation.mutate([trackData.track.id]);
      } else {
        saveTracksMutation.mutate([trackData.track.id]);
      }
    };

    const toggleIsPlaying = async () => {
      if (!isPlaybackContext) {
        playMutation.mutate({
          context: { uri: playlist!.uri },
          offset: { uri: trackData.track.uri },
        });
      } else {
        if (isPlaying) {
          await player.pause.bind(player)();
        } else {
          await player.resume.bind(player)();
        }
      }
    };

    return {
      ...trackData,
      isSaved: savedTrackIds.has(trackData.track.id),
      isPlaybackContext,
      isPlaying,
      addToQueue,
      toggleIsSaved,
      toggleIsPlaying,
    };
  });

  return (
    <>
      <PlaylistControls
        name={playlist!.name}
        type={playlist!.type}
        id={playlist!.id}
        uri={playlist!.uri}
        isFollowing={playlist!.isFollowing} // PLACEHOLDER for saved playlists store
      />
      <DataTable
        data={tracks}
        meta={{
          playlist,
          userPlaylists: Array.from({ length: 10 }, (_, i) => ({
            id: `${i + 1}`,
            name: `Playlist ${i + 1}`, // PLACRHOLDER for saved playlists store
          })),
        }}
        columns={columns}
        gridTemplateCols="grid-cols-[auto_2fr_1.5fr_1.5fr_auto_auto_auto_auto]"
        colSpan="col-span-8"
      />
    </>
  );
}
