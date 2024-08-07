import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const unfollowPlaylist = makeEndpoint({
  method: "delete",
  path: "",
  alias: "unfollowPlaylist",
  parameters: parametersBuilder()
    .addPath("/:playlist_id/followers", PlaylistIdSchema)
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default unfollowPlaylist;
