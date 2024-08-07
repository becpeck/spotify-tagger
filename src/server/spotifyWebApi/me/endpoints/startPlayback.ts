import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  AlbumURISchema,
  ArtistURISchema,
  PlaylistURISchema,
  TrackURISchema,
} from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const OffsetWithPositionSchema = z.object({
  position: z.number().int().min(0),
});

const OffsetWithUriSchema = z.object({
  uri: TrackURISchema,
});

const BodyWithContextSchema = z.object({
  context_uri: AlbumURISchema.or(ArtistURISchema).or(PlaylistURISchema),
  offset: OffsetWithPositionSchema.or(OffsetWithUriSchema).optional(),
});

const BodyWithURIsSchema = z
  .object({
    uris: z.array(TrackURISchema),
    offset: OffsetWithPositionSchema.or(OffsetWithUriSchema).optional(),
  })
  .refine(({ uris, offset }) =>
    offset && "uri" in offset ? new Set(uris).has(offset.uri) : true
  )
  .refine(({ uris, offset }) =>
    offset && "position" in offset ? offset.position < uris.length : true
  );

const startPlayback = makeEndpoint({
  method: "put",
  path: "/player/play",
  alias: "startPlayback",
  parameters: parametersBuilder()
    .addBody(
      z
        .object({
          position_ms: z.number().int().min(0).optional(),
        })
        .and(BodyWithContextSchema.or(BodyWithURIsSchema).or(z.object({})))
    )
    .addPath("/:device_id", z.string().optional())
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default startPlayback;
