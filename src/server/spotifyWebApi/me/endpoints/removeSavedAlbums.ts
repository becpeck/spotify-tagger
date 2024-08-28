import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";
import { z } from "zod";

import { AlbumIdSchema } from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const removeSavedAlbums = makeEndpoint({
  method: "delete",
  path: "/albums",
  alias: "removeSavedAlbums",
  parameters: parametersBuilder()
    .addQueries({
      ids: z
        .array(AlbumIdSchema)
        .min(1)
        .max(20)
        .transform((ids) => ids.join(",")),
    })
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default removeSavedAlbums;
