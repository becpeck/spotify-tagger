"use client";
import "client-only";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type AppStore,
  type InitAppStoreProps,
  createAppStore,
} from "@/lib/stores/appStore";

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: React.ReactNode;
  initProps: InitAppStoreProps;
}

export const AppStoreProvider = ({
  children,
  initProps,
}: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(initProps);
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
