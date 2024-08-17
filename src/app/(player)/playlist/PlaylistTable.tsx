"use client";

import { useState } from "react";
import type {
  ColumnDef,
  RowData,
  TableMeta,
  SortingState,
  SortDirection,
} from "@tanstack/react-table";
import {
  PlayIcon,
  HashIcon,
  ClockIcon,
  PauseIcon,
  CheckIcon,
  PlusIcon,
} from "lucide-react";
import Highlighter from "react-highlight-words";

import { trpc } from "@/lib/trpc/client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Link from "@/components/Link";
import ActionsMenu from "@/app/(player)/playlist/ActionsMenu";
import PlaylistControls from "@/app/(player)/playlist/PlaylistControls";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
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
  added_at: Date;
  duration_ms: number;
  isSaved: boolean;
}

export interface Track extends TrackData {
  isPlaybackContext: boolean;
  isPlaying: boolean;
  addToQueue: () => void;
  toggleIsSaved: () => void;
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

const ColumnSortIcon = ({ sorting }: { sorting: false | SortDirection }) => (
  <PlayIcon
    className={cn(
      "h-3 w-3 scale-x-75",
      sorting === "asc" ? "-rotate-90" : "rotate-90"
    )}
    stroke={sorting ? "hsl(var(--green))" : "hsl(var(--background))"}
    fill={sorting ? "hsl(var(--green))" : "hsl(var(--background))"}
  />
);

const FilterHighlight = ({
  text,
  globalFilter,
}: {
  text: string;
  globalFilter: string;
}) => (
  <>
    {globalFilter ? (
      <Highlighter
        searchWords={[globalFilter]}
        textToHighlight={text}
        highlightClassName="bg-green-500/60 text-primary rounded-sm"
      />
    ) : (
      text
    )}
  </>
);

const columns: ColumnDef<Track>[] = [
  {
    accessorKey: "number",
    enableGlobalFilter: false,
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
    id: "title",
    sortingFn: "text",
    filterFn: "includesString",
    accessorFn: (row) => row.track.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0 gap-2 justify-start hover:bg-inherit"
        onClick={() => column.toggleSorting()}
      >
        Title
        <ColumnSortIcon sorting={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row, table }) => {
      const {
        isPlaybackContext,
        track: { id, name, type },
      } = row.original;
      return (
        <Link
          color={isPlaybackContext ? "green" : "primary"}
          size="base"
          href={`/${type}/${id}`}
        >
          <FilterHighlight
            text={name}
            globalFilter={table.getState().globalFilter as string}
          />
        </Link>
      );
    },
  },
  {
    id: "artists",
    sortingFn: "text",
    filterFn: "includesString",
    accessorFn: (row) => row.artists.map((artist) => artist.name).join(", "),
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0 gap-2 justify-start hover:bg-inherit"
        onClick={() => column.toggleSorting()}
      >
        Artist
        <ColumnSortIcon sorting={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row, table }) => {
      const artists = row.original.artists satisfies Track["artists"];
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
                <FilterHighlight
                  text={name}
                  globalFilter={table.getState().globalFilter as string}
                />
              </Link>
              {i < artists.length - 1 ? ", " : null}
            </>
          ))}
        </div>
      );
    },
  },
  {
    id: "album",
    sortingFn: "text",
    filterFn: "includesString",
    accessorFn: (row) => row.album.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0 gap-2 justify-start hover:bg-inherit"
        onClick={() => column.toggleSorting()}
      >
        Album
        <ColumnSortIcon sorting={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row, table }) => {
      const { id, name, type } = row.original.album;
      return (
        <Link href={`/${type}/${id}`} className="group-hover/row:text-primary">
          <FilterHighlight
            text={name}
            globalFilter={table.getState().globalFilter as string}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "added_at",
    sortingFn: "datetime",
    sortDescFirst: false,
    enableGlobalFilter: false,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 gap-2 justify-start hover:bg-inherit"
        onClick={() => column.toggleSorting()}
      >
        Date Added
        <ColumnSortIcon sorting={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {(row.getValue("added_at") satisfies Date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "isSaved",
    enableGlobalFilter: false,
    header: () => null,
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
    enableGlobalFilter: false,
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-2 w-full justify-end hover:bg-inherit"
          onClick={() => column.toggleSorting()}
        >
          <ColumnSortIcon sorting={column.getIsSorted()} />
          <span className="sr-only">Duration</span>
          <ClockIcon size={15} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const duration = toDuration(row.getValue("duration_ms") satisfies number);
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
    enableGlobalFilter: false,
    cell: ({ row, table }) => {
      const { album, artists, track, isSaved, addToQueue, toggleIsSaved } =
        row.original;
      const playlist = table.options.meta!.playlist!;
      const userPlaylists = table.options.meta!.userPlaylists;
      return (
        <ActionsMenu
          artists={artists}
          album={album}
          track={{ ...track, isSaved }}
          playlist={playlist}
          userPlaylists={userPlaylists}
          addToQueue={addToQueue}
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const toggleSort = (label?: string) => () =>
    setSorting(
      label
        ? [{ id: label, desc: !(sorting[0]?.id !== label || sorting[0]?.desc) }]
        : []
    );

  const addOrDeleteTrackIds =
    (addOrDelete: "add" | "delete") => (trackIds: string[]) => {
      const ids = new Set(savedTrackIds);
      trackIds.forEach((id) => ids[addOrDelete](id));
      setSavedTrackIds(ids);
    };

  const playMutation = trpc.playback.playWithContext.useMutation();
  const saveTracksMutation = trpc.tracks.saveTracks.useMutation({
    onMutate: (trackIds) => addOrDeleteTrackIds("add")(trackIds),
    onError: (error, trackIds) => addOrDeleteTrackIds("delete")(trackIds),
  });
  const unsaveTracksMutation = trpc.tracks.unsaveTracks.useMutation({
    onMutate: (trackIds) => addOrDeleteTrackIds("delete")(trackIds),
    onError: (error, trackIds) => addOrDeleteTrackIds("add")(trackIds),
  });
  const addToQueueMutation = trpc.tracks.addToQueue.useMutation({
    onError: (error) => console.error(error),
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

    const addToQueue = () => addToQueueMutation.mutate(trackData.track.uri);

    const toggleIsSaved = () => {
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
        sorting={sorting}
        toggleSort={toggleSort}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
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
        sorting={sorting}
        setSorting={setSorting}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
