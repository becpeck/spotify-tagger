"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PlusIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import playbackState from "@/data/player/PlaybackState.json";

export default function CurrentlyPlaying() {
  const { name, artists, id, type, album } = playbackState.item;
  const [ image ] = album.images;

  const [isSaved, setIsSaved] = useState(false);

  const toggleIsSaved = () => setIsSaved(!isSaved);

  return (
    <div className="flex items-center gap-4 grow max-w-[30%]">
      {image
        ? <Image src={image.url} alt={`${album.name} cover`} width={50} height={50}/>
        : null
      }
      <div className="flex flex-col gap-1 shrink min-w-0">
        <Link
          href={`/${type}/${id}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 justify-start h-auto truncate block"
          )}
        >
          {name}
        </Link>
        <div className="text-muted-foreground text-xs">
          {artists.map(({ id, name, type }, i) => (
            <>
              {i > 0 ? ", " : null}
              <Link
                href={`/${type}/${id}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 justify-start h-auto text-muted-foreground text-xs hover:text-primary"
                )}
                key={id}
              >
                {name}
              </Link>
            </>
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
        {isSaved
          ? <CheckIcon
              className="h-[66%] w-[66%] pt-[7%]"
              strokeWidth={3}
              stroke="hsl(var(--background))"
            />
          : <PlusIcon
              className="h-[66%] w-[66%]"
              strokeWidth={3}
              stroke="hsl(var(--plus-color))"
            />
        }
      </Button>
    </div>
  );
}
