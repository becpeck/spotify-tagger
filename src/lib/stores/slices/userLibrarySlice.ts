import { type StateCreator } from "zustand";
import { type InitAppStoreProps, type AppStore } from "@/lib/stores/appStore";

interface UserAlbum {
  id: string;
  images:
    | {
        url: string;
        height: number | null;
        width: number | null;
      }[];
  name: string;
  uri: `spotify:album:${string}`;
  artists: { id: string; name: string }[];
  type: "album";
}

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
  userAlbums: UserAlbum[];
  userPlaylists: UserPlaylist[];
  addUserAlbum: (userAlbum: UserAlbum) => void;
  removeUserAlbum: (albumId: string) => void;
  addUserPlaylist: (userPlaylist: UserPlaylist) => void;
  removeUserPlaylist: (playlistId: string) => void;
}

export const createUserLibrarySlice: (
  initProps: InitAppStoreProps
) => StateCreator<AppStore, [], [], UserLibrarySlice> =
  ({ user, userAlbums, userPlaylists }) =>
  (set, get) => ({
    user,
    userAlbums,
    userPlaylists,
    addUserAlbum: (userAlbum) => {
      const { userAlbums } = get();
      if (!userAlbums.some((album) => album.id === userAlbum.id)) {
        set({ userAlbums: [userAlbum, ...userAlbums] });
      }
    },
    removeUserAlbum: (albumId) =>
      set({
        userAlbums: get().userAlbums.filter((album) => album.id !== albumId),
      }),
    addUserPlaylist: (userPlaylist) => {
      const { userPlaylists } = get();
      if (!userPlaylists.some((playlist) => playlist.id === userPlaylist.id)) {
        set({ userPlaylists: [userPlaylist, ...userPlaylists] });
      }
    },
    removeUserPlaylist: (playlistId) =>
      set({
        userPlaylists: get().userPlaylists.filter(
          (playlist) => playlist.id !== playlistId
        ),
      }),
  });
