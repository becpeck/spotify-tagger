import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const setRepeatMode = makeEndpoint({
  method: "put",
  path: "/player/repeat",
  alias: "setRepeatMode",
  parameters: parametersBuilder()
    .addQueries({
      state: z.union([
        z.literal("track"),
        z.literal("context"),
        z.literal("off"),
      ]),
      device_id: z.string().optional(),
    })
    .addBody(z.object({}))
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default setRepeatMode;
