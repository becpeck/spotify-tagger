import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const updateCoverImage = makeEndpoint({
  method: "put",
  path: "/:playlist_id/images",
  alias: "updateCoverImage",
  parameters: parametersBuilder()
    .addBody(z.string())
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});
z
export default updateCoverImage;
