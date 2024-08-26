import { type StateCreator } from "zustand";
import { type AppStore } from "@/lib/stores/appStore";

export interface PlaybackStateSlice {
  playbackState: WebPlaybackState | null;
  setPlaybackState: (playbackState: WebPlaybackState) => void;
}

export const createPlaybackStateSlice: StateCreator<
  AppStore,
  [],
  [],
  PlaybackStateSlice
> = (set) => ({
  playbackState: null,
  setPlaybackState: (playbackState: WebPlaybackState) => set({ playbackState }),
});
