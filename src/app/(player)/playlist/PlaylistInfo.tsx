import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ListMusicIcon, ClockIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toDuration, toDurationString } from "@/utils/timeUtils";

type PlaylistInfoProps = {
  imageUrl: string;
  type: string;
  name: string;
  description: string;
  owner: { id: string; display_name: string };
  followers: { total: number };
  total: number;
  duration_ms: number;
};

export default function PlaylistInfo({
  imageUrl,
  type,
  name,
  description,
  owner,
  followers,
  total,
  duration_ms,
}: PlaylistInfoProps) {
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
          className="h-[250px] w-[250px] rounded-sm"
        />
      ) : null}
      <div className="shrink">
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
          {owner.display_name || owner.id}
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
