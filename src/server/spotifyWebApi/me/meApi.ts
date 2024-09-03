import { apiBuilder } from "@zodios/core";

import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";

import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";
import toggleShuffle from "@/server/spotifyWebApi/me/endpoints/toggleShuffle";
import setRepeatMode from "@/server/spotifyWebApi/me/endpoints/setRepeatMode";
import startPlayback from "@/server/spotifyWebApi/me/endpoints/startPlayback";
import addToQueue from "@/server/spotifyWebApi/me/endpoints/addToQueue";

import checkSavedTracks from "@/server/spotifyWebApi/me/endpoints/checkSavedTracks";
import saveTracks from "@/server/spotifyWebApi/me/endpoints/saveTracks";
import removeSavedTracks from "@/server/spotifyWebApi/me/endpoints/removeSavedTracks";

import getMyAlbums from "@/server/spotifyWebApi/me/endpoints/getMyAlbums";
import checkSavedAlbums from "@/server/spotifyWebApi/me/endpoints/checkSavedAlbums";
import saveAlbums from "@/server/spotifyWebApi/me/endpoints/saveAlbums";
import removeSavedAlbums from "@/server/spotifyWebApi/me/endpoints/removeSavedAlbums";

import getMyPlaylists from "@/server/spotifyWebApi/me/endpoints/getMyPlaylists";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .addEndpoint(toggleShuffle)
  .addEndpoint(setRepeatMode)
  .addEndpoint(startPlayback)
  .addEndpoint(addToQueue)
  .addEndpoint(checkSavedTracks)
  .addEndpoint(saveTracks)
  .addEndpoint(removeSavedTracks)
  .addEndpoint(getMyAlbums)
  .addEndpoint(checkSavedAlbums)
  .addEndpoint(saveAlbums)
  .addEndpoint(removeSavedAlbums)
  .addEndpoint(getMyPlaylists)
  .build();

export default meApi;
