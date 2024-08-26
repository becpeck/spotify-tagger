import { type StateCreator } from "zustand";
import { type AppStore } from "@/lib/stores/appStore";

export interface PlayerSlice {
  player: SpotifyPlayer | null;
  setPlayer: (player: SpotifyPlayer) => void;
}

export const createPlayerSlice: StateCreator<AppStore, [], [], PlayerSlice> = (
  set
) => ({
  player: null,
  setPlayer: (player: SpotifyPlayer) => set({ player }),
});
