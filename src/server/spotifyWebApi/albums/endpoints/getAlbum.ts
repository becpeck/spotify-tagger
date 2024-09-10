import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  CopyrightsSchema,
  CountrySchema,
  ExternalIdsSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedTrackObjectSchema,
} from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const getAlbum = makeEndpoint({
  method: "get",
  path: "/:album_id",
  alias: "getAlbum",
  parameters: parametersBuilder()
    .addQueries({
      market: CountrySchema.optional(),
    })
    .build(),
  response: SimplifiedAlbumObjectSchema.and(
    z.object({
      tracks: z.object({
        href: z.string(),
        limit: z.number(),
        next: z.string().nullable(),
        offset: z.number(),
        previous: z.string().nullable(),
        total: z.number(),
        items: z.array(SimplifiedTrackObjectSchema),
      }),
      copyrights: CopyrightsSchema,
      external_ids: ExternalIdsSchema,
      genres: z.array(z.string()),
      label: z.string(),
      popularity: z.number().min(0).max(100),
    })
  ),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getAlbum;
