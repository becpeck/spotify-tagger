import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";
import { z } from "zod";

import { TrackIdSchema } from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const saveTracks = makeEndpoint({
  method: "put",
  path: "/tracks",
  alias: "saveTracks",
  parameters: parametersBuilder()
    .addQueries({
      ids: z
        .array(TrackIdSchema)
        .min(1)
        .max(50)
        .transform((ids) => ids.join(",")),
    })
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default saveTracks;
