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
  addUserPlaylist: (userPlaylist: UserPlaylist) => void;
  removeUserPlaylist: (playlistId: string) => void;
}

export const createUserLibrarySlice: (
  initProps: InitAppStoreProps
) => StateCreator<AppStore, [], [], UserLibrarySlice> =
  ({ userPlaylists, user }) =>
  (set, get) => ({
    user,
    userPlaylists,
    addUserPlaylist: (userPlaylist) => {
      const { userPlaylists } = get();
      if (!userPlaylists.some((playlist) => playlist.id === userPlaylist.id)) {
        set({ userPlaylists: [userPlaylist, ...userPlaylists] });
      }
    },
    removeUserPlaylist: (playlistId) =>
      set({
        userPlaylists: userPlaylists.filter(
          (playlist) => playlist.id !== playlistId
        ),
      }),
  });
