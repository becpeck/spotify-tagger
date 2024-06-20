import { z } from "zod";

export const CountrySchema = z.string();

export const ExplicitContentSchema = z
  .object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  })
  .transform(({ filter_enabled, filter_locked }) => ({
    filterEnabled: filter_enabled,
    filterLocked: filter_locked,
  }));

export const ExternalUrlsSchema = z.object({
  spotify: z.string(),
});

export const FollowersSchema = z.object({
  href: z.string().nullable(),
  total: z.number().int(),
});

export const ImagesSchema = z
  .array(
    z.object({
      url: z.string(),
      height: z.number().int().nullable(),
      width: z.number().int().nullable(),
    })
  )
  .transform((images) => images.reverse());

export const ProductSchema = z.union([
  z.literal("premium"),
  z.literal("free"),
  z.literal("open"),
  z.string(),
]);

export const RestrictionsSchema = z.object({
  reason: z.union([
    z.literal("market"),
    z.literal("product"),
    z.literal("explicit"),
    z.string(),
  ]),
});

export const SimplifiedArtistObjectSchema = z.object({
  external_urls: ExternalUrlsSchema,
  href: z.string(),
  id: z.string(),
  name: z.string(),
  type: z.literal("artist"),
  uri: z.string(),
});

export const TrackObjectSchema = z.object({
  album: z.object({
    album_type: z.union([
      z.literal("album"),
      z.literal("single"),
      z.literal("compilation"),
    ]),
    total_tracks: z.number().int(),
    available_markets: z.array(CountrySchema),
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: ImagesSchema,
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.union([
      z.literal("year"),
      z.literal("month"),
      z.literal("day"),
    ]),
    // restrictions: RestrictionsSchema.optional(),
    type: z.literal("album"),
    uri: z.string(),
    artists: z.array(SimplifiedArtistObjectSchema),
  }),
  artists: z.array(SimplifiedArtistObjectSchema),
  available_markets: z.array(CountrySchema),
  disc_number: z.number().int(),
  duration_ms: z.number().int(),
  explicit: z.boolean(),
  external_ids: z.object({
    isrc: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
  }),
  external_urls: ExternalUrlsSchema,
  href: z.string(),
  id: z.string(),
  // is_playable: z.boolean().optional(),
  // linked_from: z.object({}).optional(),
  // restrictions: RestrictionsSchema.optional(),
  name: z.string(),
  popularity: z.number().int().min(0).max(100),
  preview_url: z.string().nullable(),
  track_number: z.number().int(),
  type: z.literal("track"),
  uri: z.string(),
  is_local: z.boolean(),
});
