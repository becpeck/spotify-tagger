"use client";
import "client-only";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type PlaybackStore, createPlaybackStore } from "./playbackStore";

export type PlaybackStoreApi = ReturnType<typeof createPlaybackStore>;

export const PlaybackStoreContext = createContext<PlaybackStoreApi | undefined>(
  undefined
);

export interface PlaybackStoreProviderProps {
  children: ReactNode;
}

export const PlaybackStoreProvider = ({
  children,
}: PlaybackStoreProviderProps) => {
  const storeRef = useRef<PlaybackStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createPlaybackStore();
  }

  return (
    <PlaybackStoreContext.Provider value={storeRef.current}>
      {children}
    </PlaybackStoreContext.Provider>
  );
};

export const usePlaybackStore = <T,>(
  selector: (store: PlaybackStore) => T
): T => {
  const playbackStoreContext = useContext(PlaybackStoreContext);

  if (!playbackStoreContext) {
    throw new Error(
      `usePlaybackStore must be used within PlaybackStoreProvider`
    );
  }

  return useStore(playbackStoreContext, selector);
};
