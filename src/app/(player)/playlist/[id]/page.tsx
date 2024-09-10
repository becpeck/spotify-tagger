import { trpc } from "@/lib/trpc/server";

import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import PageContent from "@/app/(player)/playlist/[id]/PageContent";
import EditPageContent from "@/app/(player)/playlist/[id]/EditPageContent";

export default async function Playlist({ params }: { params: { id: string } }) {
  const playlist = await trpc.playlist.getPlaylistData.query(params.id);

  const duration_ms = playlist.tracks.reduce(
    (acc, { duration_ms }) => acc + duration_ms,
    0
  );
  const imageUrl =
    (
      playlist.images?.find(({ width }) => width && width >= 250) ??
      playlist.images?.[0]
    )?.url ?? "";

  const data = playlist.tracks.map((track, i) => {
    const imageUrl =
      (
        track.album.images.find(({ width }) => width && width < 100) ??
        track.album.images[0]
      )?.url ?? null;

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
      is_playable: "is_playable" in track ? track.is_playable : undefined,
      is_saved: track.is_saved,
      name: track.name,
      restrictions: "restrictions" in track ? track.restrictions : undefined,
      track_number: i + 1,
      type: track.type,
      uri: track.uri,
    };
  });

  const props = {
    imageUrl,
    duration_ms,
    data: data as PlaylistTrack[],
    playlist,
  };

  return (
    <main>
      {playlist.is_editable ? (
        <EditPageContent {...props} />
      ) : (
        <PageContent {...props} />
      )}
    </main>
  );
}
