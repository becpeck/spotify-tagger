import { trpc } from "@/trpc/server";

import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import PlaylistControls from "@/app/(player)/playlist/PlaylistControls";
import PlaylistTable from "@/app/(player)/playlist/PlaylistTable";

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await trpc.playlist.getPlaylistData.query(params.id);

  const {
    images,
    description,
    followers,
    name,
    owner,
    type,
    tracks,
    isFollowing,
  } = playlist;
  const { total } = tracks;
  const duration_ms = tracks.items.reduce(
    (acc, track) => acc + track.track.duration_ms,
    0
  );
  const imageUrl = (() => {
    const image =
      images.find(({ width }) => width && width >= 250) ?? images[0];
    return image?.url ?? "";
  })();

  const data = tracks.items.map(({ added_at, track }, i) => {
    const { id, artists, album, name, duration_ms, type } = track;
    return {
      number: i + 1,
      track: { id, name, type },
      artists: artists.map(({ id, name, type }) => ({ id, name, type })),
      album: {
        id: album.id,
        name: album.name,
        type: album.type,
      },
      added_at,
      duration_ms,
    };
  });
  const meta = {
    playlist: {
      id: playlist.id,
      name: playlist.name,
      type: playlist.type,
      uri: playlist.uri,
    },
    userPlaylists: Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Playlist ${i + 1}`,
    })),
  };

  return (
    <main>
      <PlaylistInfo
        imageUrl={imageUrl}
        type={type}
        name={name}
        description={description}
        owner={owner}
        followers={followers}
        total={total}
        duration_ms={duration_ms}
      />
      <PlaylistControls
        name={name}
        type={type}
        id={playlist.id}
        uri={playlist.uri}
        isFollowing={isFollowing}
      />
      <PlaylistTable data={data} meta={meta} />
    </main>
  );
}
