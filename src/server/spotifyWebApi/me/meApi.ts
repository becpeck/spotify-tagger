import { apiBuilder } from "@zodios/core";
import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";
import transferPlayback from "@/server/spotifyWebApi/me/endpoints/transferPlayback";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .addEndpoint(transferPlayback)
  .build();

export default meApi;
