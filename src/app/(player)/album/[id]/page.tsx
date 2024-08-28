import { trpc } from "@/lib/trpc/server";

import AlbumInfo from "@/app/(player)/album/AlbumInfo";
import TrackTable from "@/app/(player)/album/TrackTable";

export default async function Album({ params }: { params: { id: string } }) {
  const album = await trpc.albums.getAlbumData.query(params.id);

  const {
    album_type,
    copyrights,
    id,
    images,
    name,
    artists,
    total_tracks,
    tracks,
    type,
    uri,
  } = album;

  const duration_ms = tracks.reduce(
    (acc, { duration_ms }) => acc + duration_ms,
    0
  );
  const imageUrl =
    (images.find(({ width }) => width && width >= 250) ?? images[0])?.url ?? "";
  const releaseDate = new Date(album.release_date);

  const trackData = tracks.map((track) => {
    return {
      artists: track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
      })),
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      id: track.id,
      is_local: track.is_local,
      is_playable: track.is_playable,
      is_saved: track.is_saved,
      name: track.name,
      restrictions: track.restrictions,
      track_number: track.track_number,
      type: track.type,
      uri: track.uri,
      disc_number: track.disc_number,
    };
  });

  return (
    <main>
      <AlbumInfo
        imageUrl={imageUrl}
        album_type={album_type}
        name={name}
        artists={artists.map(({ id, name, type }) => ({ id, name, type }))}
        total={total_tracks}
        duration_ms={duration_ms}
        year={releaseDate.getFullYear()}
      />
      <TrackTable tracks={trackData} album={{ id, name, type, uri }} />
      <div className="text-muted-foreground text-xs p-4">
        <p className="text-sm">
          {releaseDate.toLocaleDateString("us-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {copyrights.map(({ type, text }, i) => (
          <p key={i}>
            {type === "C" ? "©" : type === "P" ? "℗" : type} {text}
          </p>
        ))}
      </div>
    </main>
  );
}
