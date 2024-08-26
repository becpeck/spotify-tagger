import { trpc } from "@/lib/trpc/server";

import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await trpc.playlist.getPlaylistData.query(params.id);

  const { images, description, followers, name, owner, type, tracks } =
    playlist;
  const { total } = tracks;
  const duration_ms = tracks.items.reduce(
    (acc, track) => acc + track.track.duration_ms,
    0
  );
  const imageUrl =
    (images.find(({ width }) => width && width >= 250) ?? images[0])?.url ?? "";

  const data = tracks.items.map(({ added_at, track, isSaved }, i) => {
    const { id, artists, album, name, duration_ms, type, uri } = track;
    const imageUrl =
      (album.images.find(({ width }) => width && width < 100) ?? images[0])
        ?.url ?? "";

    return {
      number: i + 1,
      track: { id, name, type, uri },
      artists: artists.map(({ id, name, type }) => ({ id, name, type })),
      album: {
        id: album.id,
        name: album.name,
        type: album.type,
      },
      isSaved,
      added_at,
      duration_ms,
      imageUrl,
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
        total={total}
        duration_ms={duration_ms}
      />
      <TrackTable trackDataArr={data} playlist={playlist} />
    </main>
  );
}
