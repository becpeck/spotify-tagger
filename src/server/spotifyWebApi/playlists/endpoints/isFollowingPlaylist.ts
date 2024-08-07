import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const isFollowingPlaylist = makeEndpoint({
  method: "get",
  path: "/:playlist_id/followers/contains",
  alias: "isFollowingPlaylist",
  response: z
    .array(z.boolean())
    .min(1)
    .max(1)
    .transform(([isFollowing]) => isFollowing!),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default isFollowingPlaylist;
