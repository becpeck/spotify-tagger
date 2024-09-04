import { createStore } from "zustand";
import {
  type PlayerSlice,
  createPlayerSlice,
} from "@/lib/stores/slices/playerSlice";
import {
  type PlaybackStateSlice,
  createPlaybackStateSlice,
} from "@/lib/stores/slices/playbackStateSlice";
import {
  type UserLibrarySlice,
  createUserLibrarySlice,
} from "@/lib/stores/slices/userLibrarySlice";

export type AppStore = PlayerSlice & PlaybackStateSlice & UserLibrarySlice;

export interface InitAppStoreProps {
  user: UserLibrarySlice["user"];
  userAlbums: UserLibrarySlice["userAlbums"];
  userPlaylists: UserLibrarySlice["userPlaylists"];
}

export const createAppStore = (initProps: InitAppStoreProps) => {
  return createStore<AppStore>()((...a) => ({
    ...createPlayerSlice(...a),
    ...createPlaybackStateSlice(...a),
    ...createUserLibrarySlice(initProps)(...a),
  }));
};
