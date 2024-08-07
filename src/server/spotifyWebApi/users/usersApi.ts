import { apiBuilder } from "@zodios/core";
import getUserProfile from "@/server/spotifyWebApi/users/endpoints/getUserProfile";

const usersApi = apiBuilder()
  .addEndpoint(getUserProfile)
  .build();

export default usersApi;
