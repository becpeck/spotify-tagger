import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const toggleShuffle = makeEndpoint({
  method: "put",
  path: "/player/shuffle",
  alias: "toggleShuffle",
  parameters: parametersBuilder()
    .addQueries({
      state: z.boolean(),
      device_id: z.string().optional(),
    })
    .addBody(z.object({}))
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default toggleShuffle;
