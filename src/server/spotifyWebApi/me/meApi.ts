import { apiBuilder } from "@zodios/core";
import getMyProfile from "@/server/spotifyWebApi/me/endpoints/getMyProfile";

const meApi = apiBuilder()
  .addEndpoint(getMyProfile)
  .build();

export default meApi;
