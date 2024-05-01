import Image from "next/image";
import Link from "next/link";
import { type TableMeta } from "@tanstack/react-table";
import { HeartIcon, ListMusicIcon, ClockIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import DataTable from "@/components/ui/data-table";
import { type Track, columns } from "@/components/TrackTable/playlistColumns";

import playlist from "@/data/playlist/Playlist.json";

export default function Playlist({}) {
  const { images, description, followers, name, owner, type, tracks } = playlist;
  const { total } = tracks;
  const duration = tracks.items.reduce((acc, track) => acc + track.track.duration_ms, 0);
  const data: Track[] = tracks.items.map(({ added_at, track }, i) => {
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

  const stringifyDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    if (hours > 0) {
      return `${hours} hr, ${minutes} min`;
    } else {
      const seconds = totalSeconds - (hours * 3600) - (minutes * 60);
      return `${minutes} min, ${seconds} sec`;
    }
  }

  return (
      <main>
        <header className="flex p-4 gap-4">
          {images.length > 0
            ? <Image
                src={images[0]!.url}
                height={250}
                width={250}
                alt={`${name} cover`}
                priority
              />
          : null}
          <div>
            <h4 className="capitalize">{type}</h4>
            <h1 className="text-4xl font-bold">{name}</h1>
            <div className="text-muted-foreground">{description}</div>
            <Link href={`/user/${owner.id}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 text-base font-semibold h-auto"
              )}
            >{owner.display_name}</Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <HeartIcon size={15} stroke="hsl(var(--muted-foreground))"/>
              <span>{followers.total} likes</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ListMusicIcon size={15} stroke="hsl(var(--muted-foreground))"/>
              <span>{total} songs</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ClockIcon size={15} stroke="hsl(var(--muted-foreground))"/>
              <span>{stringifyDuration(duration)}</span>
            </div>
          </div>
        </header>
        <DataTable columns={columns} data={data} meta={meta}/>
      </main>
  );
}
