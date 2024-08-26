import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";
import { z } from "zod";

import { TrackIdSchema } from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const checkSavedTracks = makeEndpoint({
  method: "get",
  path: "/tracks/contains",
  alias: "checkSavedTracks",
  parameters: parametersBuilder()
    .addQueries({
      ids: z
        .array(TrackIdSchema)
        .max(50)
        .transform((ids) => ids.join(",")),
    })
    .build(),
  response: z.array(z.boolean()),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default checkSavedTracks;
