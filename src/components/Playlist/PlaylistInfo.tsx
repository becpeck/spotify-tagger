import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ListMusicIcon, ClockIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlaylistInfoProps = {
  images: { height: number; width: number; url: string }[],
  type: string,
  name: string,
  description: string,
  owner: { id: string; display_name: string },
  followers: { total: number },
  total: number,
  duration: number,
};

export default function PlaylistInfo({
  images,
  type,
  name,
  description,
  owner,
  followers,
  total,
  duration,
}: PlaylistInfoProps) {
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
    <header className="flex p-4 gap-4">
      {images.length > 0 ? (
        <Image
          src={images[0]!.url}
          height={250}
          width={250}
          alt={`${name} cover`}
          priority
        />
      ) : null}
      <div>
        <h4 className="capitalize">{type}</h4>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="text-muted-foreground">{description}</div>
        <Link
          href={`/user/${owner.id}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 text-base font-semibold h-auto"
          )}
        >
          {owner.display_name}
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <HeartIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{followers.total} likes</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ListMusicIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{total} songs</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ClockIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{stringifyDuration(duration)}</span>
        </div>
      </div>
    </header>
  );
}
