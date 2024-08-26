"use client";
import "client-only";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AppStore, createAppStore } from "@/lib/stores/appStore";

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: React.ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const storeContext = useContext(AppStoreContext);

  if (!storeContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(storeContext, selector);
};
