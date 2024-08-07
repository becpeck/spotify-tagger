import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const transferPlayback = makeEndpoint({
  method: "put",
  path: "/player",
  alias: "transferPlayback",
  parameters: parametersBuilder()
    .addBody(
      z
        .object({
          device_id: z.string(),
          play: z.boolean().optional(),
        })
        .transform(({ device_id, play }) => ({
          device_ids: [device_id],
          play,
        }))
    )
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default transferPlayback;
