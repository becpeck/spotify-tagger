import { apiBuilder } from "@zodios/core";
import getPlaylist from "@/server/spotifyWebApi/playlists/endpoints/getPlaylist";
import followPlaylist from "@/server/spotifyWebApi/playlists/endpoints/followPlaylist";
import unfollowPlaylist from "@/server/spotifyWebApi/playlists/endpoints/unfollowPlaylist";
import isFollowingPlaylist from "@/server/spotifyWebApi/playlists/endpoints/isFollowingPlaylist";

const playlistsApi = apiBuilder()
  .addEndpoint(getPlaylist)
  .addEndpoint(followPlaylist)
  .addEndpoint(unfollowPlaylist)
  .addEndpoint(isFollowingPlaylist)
  .build();

export default playlistsApi;
