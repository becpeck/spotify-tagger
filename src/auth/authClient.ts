import {
  type ZodiosPlugin,
  makeEndpoint,
  parametersBuilder,
  apiBuilder,
  Zodios,
  formURLPlugin,
} from "@zodios/core";
import z from "zod";
import { env } from "@/env";

const API_BASE_URL = "https://accounts.spotify.com/api";

const basicAuthorizationPlugin: ZodiosPlugin = {
  name: "basicAuthorization",
  request: async (api, config) => {
    return {
      ...config,
      auth: {
        username: env.AUTH_SPOTIFY_ID,
        password: env.AUTH_SPOTIFY_SECRET,
      },
    };
  },
};

const refreshToken = makeEndpoint({
  method: "post",
  path: "/token",
  alias: "refreshToken",
  parameters: parametersBuilder()
    .addBody(
      z.object({
        grant_type: z.literal("refresh_token"),
        refresh_token: z.string(),
      })
    )
    .build(),
  response: z.object({
    access_token: z.string(),
    token_type: z.literal("Bearer"),
    expires_in: z.number(),
    scope: z.string(),
  }),
});

const authApi = apiBuilder().addEndpoint(refreshToken).build();

const authClient = new Zodios(API_BASE_URL, authApi);
authClient.use("refreshToken", formURLPlugin());
authClient.use("refreshToken", basicAuthorizationPlugin);

export default authClient;
