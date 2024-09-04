import { trpc } from "@/lib/trpc/server";

import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await trpc.playlist.getPlaylistData.query(params.id);

  const {
    collaborative,
    description,
    followers,
    id,
    images,
    is_saved,
    name,
    owner,
    total_tracks,
    type,
    tracks,
    uri,
  } = playlist;
  const duration_ms = tracks.reduce(
    (acc, { duration_ms }) => acc + duration_ms,
    0
  );
  const imageUrl =
    (images.find(({ width }) => width && width >= 250) ?? images[0])?.url ?? "";

  const data = tracks.map((track, i) => {
    const imageUrl =
      (
        track.album.images.find(({ width }) => width && width < 100) ??
        images[0]
      )?.url ?? "";

    return {
      added_at: track.added_at,
      album: {
        id: track.album.id,
        name: track.album.name,
        type: track.album.type,
      },
      artists: track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
      })),
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      id: track.id,
      imageUrl,
      is_local: track.is_local,
      is_playable: track.is_playable,
      is_saved: track.is_saved,
      name: track.name,
      restrictions: track.restrictions,
      track_number: i + 1,
      type: track.type,
      uri: track.uri,
    };
  });

  return (
    <main>
      <PlaylistInfo
        imageUrl={imageUrl}
        type={type}
        name={name}
        description={description}
        owner={owner}
        followers={followers}
        total={total_tracks}
        duration_ms={duration_ms}
      />
      <TrackTable
        tracks={data}
        playlist={{
          collaborative,
          id,
          images,
          is_saved,
          name,
          owner,
          type,
          uri,
        }}
      />
    </main>
  );
}
