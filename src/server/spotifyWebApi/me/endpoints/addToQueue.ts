import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";
import { z } from "zod";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";
import { TrackURISchema } from "../../utils/schemas";

const addToQueue = makeEndpoint({
  method: "post",
  path: "/player/queue",
  alias: "addToQueue",
  parameters: parametersBuilder()
    .addQueries({
      uri: TrackURISchema,
      device_id: z.string().optional(),
    })
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default addToQueue;
