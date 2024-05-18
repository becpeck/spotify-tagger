import PlaylistInfo from "@/app/(player)/playlist/[id]/playlist-info";
import PlaylistControls from "@/app/(player)/playlist/[id]/playlist-controls";
import PlaylistTable from "@/app/(player)/playlist/[id]/playlist-table";

import playlist from "@/data/playlist/Playlist.json";

export default function Playlist({}) {
  const { images, description, followers, name, owner, type, tracks } = playlist;
  const { total } = tracks;
  const duration_ms = tracks.items.reduce((acc, track) => acc + track.track.duration_ms, 0);
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
    },
    userPlaylists: Array.from({length: 10}, (_, i) => ({ id: `${i + 1}`, name: `Playlist ${i + 1}`})),
  };

  return (
      <main>
        <PlaylistInfo
          images={images}
          type={type}
          name={name}
          description={description}
          owner={owner}
          followers={followers}
          total={total}
          duration_ms={duration_ms}
        />
        <PlaylistControls playlist={playlist}/>
        <PlaylistTable data={data} meta={meta}/>
      </main>
  );
}
