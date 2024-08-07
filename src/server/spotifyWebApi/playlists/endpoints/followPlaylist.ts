import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const followPlaylist = makeEndpoint({
  method: "put",
  path: "/:playlist_id/followers",
  alias: "followPlaylist",
  parameters: parametersBuilder()
    .addBody(z.object({ public: z.boolean().optional() }))
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default followPlaylist;
