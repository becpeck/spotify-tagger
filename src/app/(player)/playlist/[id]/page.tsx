import { trpc } from "@/lib/trpc/server";

import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import PlaylistTable from "@/app/(player)/playlist/PlaylistTable";

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await trpc.playlist.getPlaylistData.query(params.id);

  const { images, description, followers, name, owner, type, tracks } =
    playlist;
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

  const data = tracks.items.map(({ added_at, track, isSaved }, i) => {
    const { id, artists, album, name, duration_ms, type, uri } = track;
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
      <PlaylistTable trackDataArr={data} playlist={playlist} />
    </main>
  );
}
