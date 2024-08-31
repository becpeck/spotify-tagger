import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  AlbumIdSchema,
  AlbumTypeSchema,
  AlbumURISchema,
  AvailableMarketsSchema,
  ExternalIdsSchema,
  ExternalUrlsSchema,
  ImagesSchema,
  MarketSchema,
  RestrictionsSchema,
  SimplifiedArtistObjectSchema,
  TrackIdSchema,
  TrackTypeSchema,
  TrackURISchema,
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
      market: MarketSchema.optional(),
    })
    .build(),
  response: z.object({
    album_type: z.union([z.literal("album"), z.literal("single"), z.literal("compilation")]),
    total_tracks: z.number(),
    available_markets: AvailableMarketsSchema,
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: AlbumIdSchema,
    images: ImagesSchema,
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
    restrictions: RestrictionsSchema.optional(),
    type: AlbumTypeSchema,
    uri: AlbumURISchema,
    artists: z.array(SimplifiedArtistObjectSchema),
    tracks: z.object({
      href: z.string(),
      limit: z.number(),
      next: z.string().nullable(),
      offset: z.number(),
      previous: z.string().nullable(),
      total: z.number(),
      items: z.array(z.object({
        artists: z.array(SimplifiedArtistObjectSchema),
        available_markets: AvailableMarketsSchema,
        disc_number: z.number(),
        duration_ms: z.number(),
        explicit: z.boolean(),
        external_urls: ExternalUrlsSchema,
        href: z.string(),
        id: TrackIdSchema,
        is_playable: z.boolean().optional(),
        linked_from: z.object({
          external_urls: ExternalUrlsSchema,
          href: z.string(),
          id: TrackIdSchema,
          type: TrackTypeSchema,
          uri: TrackURISchema,
        }).optional(),
        restrictions: RestrictionsSchema.optional(),
        name: z.string(),
        preview_url: z.string().nullable(),
        track_number: z.number(),
        type: TrackTypeSchema,
        uri: TrackURISchema,
        is_local: z.boolean(),
      })),
    }),
    copyrights: z.array(z.object({
      text: z.string(),
      type: z.union([z.literal("C"), z.literal("P")]),
    })),
    external_ids: ExternalIdsSchema,
    genres: z.array(z.string()),
    label: z.string(),
    popularity: z.number().min(0).max(100),
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getAlbum;
