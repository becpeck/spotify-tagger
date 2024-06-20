import { apiBuilder } from "@zodios/core";
import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";
import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";
import toggleShuffle from "@/server/spotifyWebApi/me/endpoints/toggleShuffle";
import setRepeatMode from "@/server/spotifyWebApi/me/endpoints/setRepeatMode";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .addEndpoint(toggleShuffle)
  .addEndpoint(setRepeatMode)
  .build();

export default meApi;
