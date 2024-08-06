import { apiBuilder } from "@zodios/core";

import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";
import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";
import toggleShuffle from "@/server/spotifyWebApi/me/endpoints/toggleShuffle";
import setRepeatMode from "@/server/spotifyWebApi/me/endpoints/setRepeatMode";
import startPlayback from "@/server/spotifyWebApi/me/endpoints/startPlayback";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .addEndpoint(toggleShuffle)
  .addEndpoint(setRepeatMode)
  .addEndpoint(startPlayback)
  .build();

export default meApi;
