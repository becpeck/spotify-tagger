import { Zodios, mergeApis } from "@zodios/core";
import albumsApi from "@/server/spotifyWebApi/albums/albumsApi";
import meApi from "@/server/spotifyWebApi/me/meApi";
import playlistsApi from "@/server/spotifyWebApi/playlists/playlistsApi";
import usersApi from "@/server/spotifyWebApi/users/usersApi";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

const spotifyApi = mergeApis({
  "/albums": albumsApi,
  // "/artists": apiBuilder().build(),
  // "/audio-analysis": apiBuilder().build(),
  // "/audio-features": apiBuilder().build(),
  // "/browse": apiBuilder().build(),
  "/me": meApi,
  "/playlists": playlistsApi,
  // "/recommendations": apiBuilder().build(),
  // "/search": apiBuilder().build(),
  // "/tracks": apiBuilder().build(),
  "/users": usersApi,

  // Probably won't use these?
  // "/shows": apiBuilder().build(),
  // "/markets": apiBuilder().build(),
  // "/episodes": apiBuilder().build(),
  // "/audiobooks": apiBuilder().build(),
  // "/chapters": apiBuilder().build(),
});

const spotifyApiClient = new Zodios(SPOTIFY_BASE_URL, spotifyApi);

export type SpotifyApiClient = typeof spotifyApiClient;

export default spotifyApiClient;
