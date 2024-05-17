import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const playlistData = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Playlist ${i + 1}` }));

export default function Sidebar() {
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
                "justify-start text-sm rounded-none",
              )}
            >
              Liked Songs
          </Link>
          {
            playlistData.map((playlist) => (
              <Link 
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start text-sm rounded-none",
                )}
              >
                {playlist.name}
              </Link>
            ))
          }
        </ul>
      </ScrollArea>
    </div>
  );
}
