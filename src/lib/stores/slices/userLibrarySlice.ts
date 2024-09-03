import { type StateCreator } from "zustand";
import { type InitAppStoreProps, type AppStore } from "@/lib/stores/appStore";

interface UserPlaylist {
  collaborative: boolean;
  id: string;
  images:
    | {
        url: string;
        height: number | null;
        width: number | null;
      }[]
    | null;
  name: string;
  uri: `spotify:playlist:${string}`;
  owner: {
    display_name: string | null;
    id: string;
    type: "user";
    uri: `spotify:user:${string}`;
  };
  type: "playlist";
}

export interface UserLibrarySlice {
  user: {
    id: string;
    name: string;
  };
  userPlaylists: UserPlaylist[];
  setUserPlaylists: (userPlaylists: UserPlaylist[]) => void;
}

export const createUserLibrarySlice: (
  initProps: InitAppStoreProps
) => StateCreator<AppStore, [], [], UserLibrarySlice> =
  ({ userPlaylists, user }) =>
  (set) => ({
    user,
    userPlaylists,
    setUserPlaylists: (userPlaylists) => set({ userPlaylists }),
  });
