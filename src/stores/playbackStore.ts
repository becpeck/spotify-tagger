import { createStore } from "zustand/vanilla";

export type PlaybackState = {
  player: SpotifyPlayer | null;
  playbackState: WebPlaybackState | null;
};

export type PlaybackActions = {
  setPlayer: (player: SpotifyPlayer) => void;
  setPlaybackState: (state: WebPlaybackState) => void;
};

export type PlaybackStore = PlaybackState & PlaybackActions;

export const defaultInitState: PlaybackState = {
  player: null,
  playbackState: null,
};

export const createPlaybackStore = (
  initState: PlaybackState = defaultInitState
) => {
  return createStore<PlaybackStore>()((set) => ({
    ...initState,
    setPlayer: (player: SpotifyPlayer) => set(() => ({ player })),
    setPlaybackState: (playbackState: WebPlaybackState) =>
      set(() => ({ playbackState })),
  }));
};
