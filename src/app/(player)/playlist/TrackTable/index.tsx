"use client";

import { useState } from "react";
import type { RowData, TableMeta, SortingState } from "@tanstack/react-table";

import {
  numberColumn,
  titleColumn,
  artistColumn,
  albumColumn,
  dateAddedColumn,
  isSavedColumn,
  durationColumn,
  actionsColumn,
} from "@/app/(player)/playlist/TrackTable/columns";

import { trpc } from "@/lib/trpc/client";
import { useAppStore } from "@/lib/stores/AppStoreProvider";

import DataTable from "@/components/ui/data-table";
import PlaylistControls from "@/app/(player)/playlist/TrackTable/PlaylistControls";

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

const columns = [
  numberColumn,
  titleColumn,
  artistColumn,
  albumColumn,
  dateAddedColumn,
  isSavedColumn,
  durationColumn,
  actionsColumn,
];

type TrackTableProps = {
  trackDataArr: TrackData[];
  playlist: TableMeta<Track>["playlist"];
};

export default function TrackTable({
  trackDataArr,
  playlist,
}: TrackTableProps) {
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
