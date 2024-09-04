"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "@/components/SidebarItem";

import { useAppStore } from "@/lib/stores/AppStoreProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { playbackState, user, userPlaylists } = useAppStore((state) => ({
    playbackState: state.playbackState,
    user: state.user,
    userPlaylists: state.userPlaylists,
  }));

  return (
    <div className="flex flex-col h-full items-center">
      <h2 className="text-lg font-semibold p-4">Library</h2>
      <Separator />
      <ScrollArea className="w-full p-1">
        <ul className="flex flex-col">
          <SidebarItem
            href="/collection/tracks"
            name="Liked Songs"
            type="playlist"
            isCurrentPage={pathname === "/collection/tracks"}
            isPlaybackContext={
              playbackState &&
              playbackState.context.uri === `spotify:user:${user.id}:collection`
            }
            isPlaying={
              playbackState &&
              playbackState.context.uri ===
                `spotify:user:${user.id}:collection` &&
              !playbackState.paused
            }
          />
          {userPlaylists.map((playlist) => {
            const isPlaybackContext =
              playbackState && playbackState.context.uri === playlist.uri;
            const isPlaying = isPlaybackContext && !playbackState.paused;
            return (
              <SidebarItem
                key={playlist.id}
                href={`/${playlist.type}/${playlist.id}`}
                name={playlist.name}
                type={playlist.type}
                isCurrentPage={pathname === `/${playlist.type}/${playlist.id}`}
                isPlaybackContext={isPlaybackContext}
                isPlaying={isPlaying}
              />
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
