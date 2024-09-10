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

const getMyAlbums = makeEndpoint({
  method: "get",
  path: "/albums",
  alias: "getMyAlbums",
  parameters: parametersBuilder()
    .addQueries({
      limit: z.number().min(1).max(50).default(50),
      offset: z.number().min(0).default(0),
      market: CountrySchema.optional(),
    })
    .build(),
  response: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(z.object({
      added_at: z.string().transform((datetime) => new Date(datetime)),
      album: SimplifiedAlbumObjectSchema.and(z.object({
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
        popularity: z.number(),
      }))
    })),
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getMyAlbums;
