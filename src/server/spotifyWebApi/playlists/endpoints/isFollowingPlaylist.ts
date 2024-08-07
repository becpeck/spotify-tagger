import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const isFollowingPlaylist = makeEndpoint({
  method: "get",
  path: "",
  alias: "isFollowingPlaylist",
  parameters: parametersBuilder()
    .addPath("/:playlist_id/followers/contains", PlaylistIdSchema)
    .build(),
  response: z.array(z.boolean()).min(1).max(1).transform(([isFollowing]) => isFollowing),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default isFollowingPlaylist;
