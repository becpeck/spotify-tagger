import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  CountrySchema,
  ExternalUrlsSchema,
  FollowersSchema,
  ImagesSchema,
  PlaylistIdSchema,
  PlaylistTypeSchema,
  PlaylistURISchema,
  TrackObjectSchema,
  TrackTypeSchema,
  UserIdSchema,
  UserTypeSchema,
  UserURISchema,
} from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

// TODO: Response schema needs debugging/testing under other conditions, for missing and extra properties not listed in spotify docs
const getPlaylist = makeEndpoint({
  method: "get",
  path: "/:playlist_id",
  alias: "getPlaylist",
  parameters: parametersBuilder()
    .addQueries({
      market: CountrySchema.optional(),
      fields: z.string().optional(),
      additional_types: z
        .array(z.union([TrackTypeSchema, z.literal("episode")]))
        .transform((arr) => arr.join(","))
        .optional(),
    })
    .build(),
  response: z.object({
    collaborative: z.boolean(),
    description: z
      .string()
      .nullable()
      .transform((name) => name ?? ""),
    external_urls: ExternalUrlsSchema,
    followers: FollowersSchema,
    href: z.string(),
    id: PlaylistIdSchema,
    images: ImagesSchema,
    name: z.string(),
    owner: z.object({
      external_urls: ExternalUrlsSchema,
      // followers: FollowersSchema.optional(),
      href: z.string(),
      id: UserIdSchema,
      type: UserTypeSchema,
      uri: UserURISchema,
      display_name: z
        .string()
        .nullable()
        .transform((name) => name ?? ""),
    }),
    public: z.boolean().nullable(),
    snapshot_id: z.string(),
    tracks: z.object({
      href: z.string(),
      limit: z.number().int(),
      next: z.string().nullable(),
      offset: z.number().int(),
      previous: z.string().nullable(),
      total: z.number().int(),
      items: z.array(
        z.object({
          added_at: z.string().transform((datetime) => new Date(datetime)),
          added_by: z.object({
            external_urls: ExternalUrlsSchema,
            // followers: FollowersSchema.optional(),
            href: z.string(),
            id: UserIdSchema,
            type: UserTypeSchema,
            uri: UserURISchema,
          }),
          is_local: z.boolean(),
          track: TrackObjectSchema,
        })
      ),
    }),
    type: PlaylistTypeSchema,
    uri: PlaylistURISchema,
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getPlaylist;
