import { trpc } from "@/lib/trpc/server";

import AlbumInfo from "@/app/(player)/album/AlbumInfo";

export default async function Album({ params }: { params: { id: string } }) {
  const album = await trpc.albums.getAlbumData.query(params.id);

  const {
    album_type,
    copyrights,
    images,
    name,
    artists,
    tracks: { items, total },
  } = album;

  const duration_ms = items.reduce(
    (acc, { duration_ms }) => acc + duration_ms,
    0
  );
  const imageUrl =
    (images.find(({ width }) => width && width >= 250) ?? images[0])?.url ?? "";
  const releaseDate = new Date(album.release_date);

  return (
    <main>
      <AlbumInfo
        imageUrl={imageUrl}
        album_type={album_type}
        name={name}
        artists={artists.map(({ id, name, type }) => ({ id, name, type }))}
        total={total}
        duration_ms={duration_ms}
        year={releaseDate.getFullYear()}
      />
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
