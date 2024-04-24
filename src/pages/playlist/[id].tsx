import { type TableMeta } from "@tanstack/react-table";

import DataTable from "@/components/ui/data-table";
import { type Track, columns } from "@/components/TrackTable/playlistColumns";

import playlist from "@/data/playlist/Playlist.json";

const data: Track[] = playlist.tracks.items.map(({ added_at, track }, i) => {
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

const meta: TableMeta<Track> = {
  playlist: {
    id: playlist.id,
    name: playlist.name,
    type: playlist.type,
  },
  userPlaylists: Array.from({length: 10}, (_, i) => ({ id: `${i + 1}`, name: `Playlist ${i + 1}`})),
};

export default function Playlist() {
  return (
    <main>
      <DataTable columns={columns} data={data} meta={meta}/>
    </main>
  );
}
