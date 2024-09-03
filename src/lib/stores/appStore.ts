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
  userPlaylists: UserLibrarySlice["userPlaylists"];
  user: UserLibrarySlice["user"];
}

export const createAppStore = (initProps: InitAppStoreProps) => {
  return createStore<AppStore>()((...a) => ({
    ...createPlayerSlice(...a),
    ...createPlaybackStateSlice(...a),
    ...createUserLibrarySlice(initProps)(...a),
  }));
};
