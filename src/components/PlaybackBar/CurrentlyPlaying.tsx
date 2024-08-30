"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { HeartIcon } from "lucide-react";

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
              {i < artists.length - 1 ? <Fragment key={i}>, </Fragment> : null}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent shrink-0",
          isSaved
            ? "text-green-500 hover:text-green-500"
            : "text-muted-foreground hover:text-primary"
        )}
        onClick={toggleIsSaved}
        aria-label={isSaved ? "Remove from Liked Songs" : "Save to Liked Songs"}
      >
        <HeartIcon
          className="h-4 w-4"
          {...(isSaved ? { fill: "currentColor" } : {})}
        />
      </Button>
    </div>
  );
}
