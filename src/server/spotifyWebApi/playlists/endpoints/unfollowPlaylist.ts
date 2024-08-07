import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const unfollowPlaylist = makeEndpoint({
  method: "delete",
  path: "/:playlist_id/followers",
  alias: "unfollowPlaylist",
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default unfollowPlaylist;
