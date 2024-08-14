import { createStore } from "zustand";
import { type PlayerSlice, createPlayerSlice } from "@/stores/playerSlice";
import {
  type PlaybackStateSlice,
  createPlaybackStateSlice,
} from "@/stores/playbackStateSlice";

export type AppStore = PlayerSlice & PlaybackStateSlice;

export const createAppStore = () => {
  return createStore<AppStore>()((...a) => ({
    ...createPlayerSlice(...a),
    ...createPlaybackStateSlice(...a),
  }));
};
