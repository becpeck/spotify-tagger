"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { CheckIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CurrentlyPlaying({
  className,
  currentTrack,
}: {
  className?: string;
  currentTrack: WebPlaybackState["track_window"]["current_track"];
}) {
  const { name, id, type, album } = currentTrack;
  const [ image ] = album.images.sort((a, b) => a.height - b.height);
  const artists = currentTrack.artists.map(({ name, uri }) => {
    const [_, type, id] = uri.split(":");
    return { id: id!, name, type: type! };
  });

  const [isSaved, setIsSaved] = useState(false);

  const toggleIsSaved = () => setIsSaved(!isSaved);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {image ? (
        <Image
          src={image.url}
          alt={`${album.name} cover`}
          width={64}
          height={64}
        />
      ) : null}
      <div className="flex flex-col gap-1 shrink min-w-0">
        <Link href={`/${type}/${id}`} color="primary">
          {name}
        </Link>
        <div className="text-muted-foreground text-xs truncate line-clamp-1 whitespace-normal break-all">
          {artists.map(({ id, name, type }, i) => (
            <span key={id}>
              <Link
                href={`/${type}/${id}`}
                number="list"
                size="xs"
                className="hover:text-primary"
              >
                {name}
              </Link>
              {i < artists.length - 1 ? ", " : null}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full h-4 w-4 hover:transform hover:scale-105 active:transform-none active:brightness-75 shrink-0",
          isSaved
            ? "bg-green-500 hover:bg-green-500"
            : "[--plus-color:--muted-foreground] hover:[--plus-color:--primary] border border-[hsl(var(--plus-color))]"
        )}
        onClick={toggleIsSaved}
        aria-label={isSaved ? "Remove from Library" : "Save to Library"}
      >
        {isSaved ? (
          <CheckIcon
            className="h-[66%] w-[66%] pt-[7%]"
            strokeWidth={3}
            stroke="hsl(var(--background))"
          />
        ) : (
          <PlusIcon
            className="h-[66%] w-[66%]"
            strokeWidth={3}
            stroke="hsl(var(--plus-color))"
          />
        )}
      </Button>
    </div>
  );
}
