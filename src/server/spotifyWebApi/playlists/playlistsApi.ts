import { apiBuilder } from "@zodios/core";
import getPlaylist from "@/server/spotifyWebApi/playlists/endpoints/getPlaylist";

const playlistsApi = apiBuilder()
  .addEndpoint(getPlaylist)
  .build();

export default playlistsApi;
