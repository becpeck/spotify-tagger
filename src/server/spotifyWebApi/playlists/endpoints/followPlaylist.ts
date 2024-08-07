import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const followPlaylist = makeEndpoint({
  method: "put",
  path: "",
  alias: "followPlaylist",
  parameters: parametersBuilder()
    .addPath("/:playlist_id/followers", PlaylistIdSchema)
    .addBody(z.object({
        public: z.boolean().optional(),
    }))
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default followPlaylist;
