import { apiBuilder } from "@zodios/core";
import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";
import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";
import toggleShuffle from "@/server/spotifyWebApi/me/endpoints/toggleShuffle";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .addEndpoint(toggleShuffle)
  .build();

export default meApi;
