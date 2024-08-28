import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";
import { AlbumIdSchema } from "../../utils/schemas";

const checkSavedAlbums = makeEndpoint({
  method: "get",
  path: "/albums/contains",
  alias: "checkSavedAlbums",
  parameters: parametersBuilder()
    .addQueries({
      ids: z
        .array(AlbumIdSchema)
        .min(1)
        .max(20)
        .transform((ids) => ids.join(",")),
    })
    .build(),
  response: z
    .array(z.boolean())
    .min(1)
    .max(20)
    .transform(([isSaved]) => isSaved!),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default checkSavedAlbums;
