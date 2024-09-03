"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { userPlaylists } = useAppStore((state) => ({
    userPlaylists: state.userPlaylists,
  }));

  return (
    <div className="flex flex-col h-full items-center">
      <h2 className="text-lg font-semibold p-4">Library</h2>
      <Separator />
      <ScrollArea className="w-full py-2">
        <ul className="flex flex-col">
          <Link
            key="Liked Songs"
            href={`/collection/tracks`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "justify-start text-sm rounded-none"
            )}
          >
            Liked Songs
          </Link>
          {userPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start text-sm rounded-none"
              )}
            >
              {playlist.name}
            </Link>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
