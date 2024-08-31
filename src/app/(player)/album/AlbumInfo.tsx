import Image from "next/image";
import Link from "next/link";

import { CalendarIcon, ListMusicIcon, ClockIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toDuration, toDurationString } from "@/utils/timeUtils";

type AlbumInfoProps = {
  imageUrl: string;
  album_type: "album" | "single" | "compilation";
  name: string;
  artists: { id: string; name: string; type: "artist" }[];
  total: number;
  duration_ms: number;
  year: number;
};

export default function AlbumInfo({
  imageUrl,
  album_type,
  name,
  artists,
  total,
  duration_ms,
  year,
}: AlbumInfoProps) {
  const duration = toDuration(duration_ms);

  return (
    <header className="flex m-4 gap-4">
      {imageUrl ? (
        <Image
          src={imageUrl}
          height={250}
          width={250}
          alt={`${name} cover`}
          priority
          className="h-[250px] w-[250px]"
        />
      ) : null}
      <div className="shrink">
        <h4 className="capitalize">{album_type}</h4>
        <h1 className="text-4xl font-bold">{name}</h1>
        {artists.map(({ id, name, type }) => (
          <Link
            key={id}
            href={`/${type}/${id}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "p-0 text-base font-semibold h-auto"
            )}
          >
            {name}
          </Link>
        ))}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ListMusicIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{total} songs</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ClockIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>
            {toDurationString(duration, {
              ...(duration.hours > 0
                ? { hours: "short" }
                : { seconds: "short" }),
              minutes: "short",
              separator: ", ",
            })}
          </span>
        </div>
      </div>
    </header>
  );
}
