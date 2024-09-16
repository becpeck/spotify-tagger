import { apiBuilder } from "@zodios/core";
import getPlaylist from "@/server/spotifyWebApi/playlists/endpoints/getPlaylist";
import followPlaylist from "@/server/spotifyWebApi/playlists/endpoints/followPlaylist";
import unfollowPlaylist from "@/server/spotifyWebApi/playlists/endpoints/unfollowPlaylist";
import isFollowingPlaylist from "@/server/spotifyWebApi/playlists/endpoints/isFollowingPlaylist";
import updateCoverImage from "@/server/spotifyWebApi/playlists/endpoints/updateCoverImage";
import updatePlaylistDetails from "@/server/spotifyWebApi/playlists/endpoints/updatePlaylistDetails";

const playlistsApi = apiBuilder()
  .addEndpoint(getPlaylist)
  .addEndpoint(followPlaylist)
  .addEndpoint(unfollowPlaylist)
  .addEndpoint(isFollowingPlaylist)
  .addEndpoint(updateCoverImage)
  .addEndpoint(updatePlaylistDetails)
  .build();

export default playlistsApi;
