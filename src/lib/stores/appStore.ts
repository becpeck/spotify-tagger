import { createStore } from "zustand";
import {
  type PlayerSlice,
  createPlayerSlice,
} from "@/lib/stores/slices/playerSlice";
import {
  type PlaybackStateSlice,
  createPlaybackStateSlice,
} from "@/lib/stores/slices/playbackStateSlice";

export type AppStore = PlayerSlice & PlaybackStateSlice;

export const createAppStore = () => {
  return createStore<AppStore>()((...a) => ({
    ...createPlayerSlice(...a),
    ...createPlaybackStateSlice(...a),
  }));
};
