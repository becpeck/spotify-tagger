import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import { SimplifiedPlaylistObjectSchema } from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const getMyPlaylists = makeEndpoint({
  method: "get",
  path: "/playlists",
  alias: "getMyPlaylists",
  parameters: parametersBuilder()
    .addQueries({
      limit: z.number().min(1).max(50).default(50),
      offset: z.number().min(0).default(0),
    })
    .build(),
  response: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(SimplifiedPlaylistObjectSchema),
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getMyPlaylists;
