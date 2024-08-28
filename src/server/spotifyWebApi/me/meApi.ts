import { apiBuilder } from "@zodios/core";

import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";
import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";
import toggleShuffle from "@/server/spotifyWebApi/me/endpoints/toggleShuffle";
import setRepeatMode from "@/server/spotifyWebApi/me/endpoints/setRepeatMode";
import startPlayback from "@/server/spotifyWebApi/me/endpoints/startPlayback";
import saveTracks from "@/server/spotifyWebApi/me/endpoints/saveTracks";
import removeSavedTracks from "@/server/spotifyWebApi/me/endpoints/removeSavedTracks";
import checkSavedTracks from "@/server/spotifyWebApi/me/endpoints/checkSavedTracks";
import addToQueue from "@/server/spotifyWebApi/me/endpoints/addToQueue";
import checkSavedAlbums from "@/server/spotifyWebApi/me/endpoints/checkSavedAlbums";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .addEndpoint(toggleShuffle)
  .addEndpoint(setRepeatMode)
  .addEndpoint(startPlayback)
  .addEndpoint(saveTracks)
  .addEndpoint(removeSavedTracks)
  .addEndpoint(checkSavedTracks)
  .addEndpoint(addToQueue)
  .addEndpoint(checkSavedAlbums)
  .build();

export default meApi;
