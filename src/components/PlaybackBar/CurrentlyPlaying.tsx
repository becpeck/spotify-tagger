"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

import Link from "@/components/Link";
import HeartButton from "@/components/buttons/HeartButton";
import { cn } from "@/lib/utils";

export default function CurrentlyPlaying({
  className,
  currentTrack,
}: {
  className?: string;
  currentTrack: WebPlaybackState["track_window"]["current_track"];
}) {
  const { name, id, type, album } = currentTrack;
  const [image] = album.images.sort((a, b) => a.height - b.height);
  const artists = currentTrack.artists.map(({ name, uri }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, type, id] = uri.split(":");
    return { id: id!, name, type: type! };
  });
  const [isSaved, setIsSaved] = useState(false); // TODO: implement saved state

  const toggleIsSaved = () => setIsSaved(!isSaved);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {image ? (
        <Image
          className="w-[50px] h-[50px] rounded-sm"
          src={image.url}
          alt={`${album.name} cover`}
          width={50}
          height={50}
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
      <HeartButton
        size="sm"
        className="shrink-0"
        isSaved={isSaved}
        onClick={toggleIsSaved}
        aria-label={isSaved ? "Remove from Liked Songs" : "Save to Liked Songs"}
      />
    </div>
  );
}
