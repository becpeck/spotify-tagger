import { z } from "zod";

export const AlbumTypeSchema = z.literal("album");
export const ArtistTypeSchema = z.literal("artist");
export const PlaylistTypeSchema = z.literal("playlist");
export const TrackTypeSchema = z.literal("track");
export const UserTypeSchema = z.literal("user");

export const AlbumIdSchema = z.string();
export const ArtistIdSchema = z.string();
export const PlaylistIdSchema = z.string();
export const TrackIdSchema = z.string();
export const UserIdSchema = z.string();

export const AlbumURISchema = z.custom<`spotify:${z.infer<
  typeof AlbumTypeSchema
>}:${z.infer<typeof AlbumIdSchema>}`>((str) =>
  /^spotify:album:[a-zA-Z0-9]+$/g.test(String(str))
);
export const ArtistURISchema = z.custom<`spotify:${z.infer<
  typeof ArtistTypeSchema
>}:${z.infer<typeof ArtistIdSchema>}`>((str) =>
  /^spotify:artist:[a-zA-Z0-9]+$/g.test(String(str))
);
export const PlaylistURISchema = z.custom<`spotify:${z.infer<
  typeof PlaylistTypeSchema
>}:${z.infer<typeof PlaylistIdSchema>}`>((str) =>
  /^spotify:playlist:[a-zA-Z0-9]+$/g.test(String(str))
);
export const TrackURISchema = z.custom<`spotify:${z.infer<
  typeof TrackTypeSchema
>}:${z.infer<typeof TrackIdSchema>}`>((str) =>
  /^spotify:track:[a-zA-Z0-9]+$/g.test(String(str))
);
export const UserURISchema = z.custom<`spotify:${z.infer<
  typeof UserTypeSchema
>}:${z.infer<typeof UserIdSchema>}`>((str) =>
  /^spotify:user:[a-zA-Z0-9]+$/g.test(String(str))
);

export const CountrySchema = z.string();

export const ExplicitContentSchema = z.object({
  filter_enabled: z.boolean(),
  filter_locked: z.boolean(),
});

export const ExternalIdsSchema = z.object({
  isrc: z.string().optional(),
  ean: z.string().optional(),
  upc: z.string().optional(),
});

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

export const LinkedFromSchema = z.object({
  external_urls: ExternalUrlsSchema,
  href: z.string(),
  id: TrackIdSchema,
  type: TrackTypeSchema,
  uri: TrackURISchema,
});

export const MarketSchema = z.string().length(2);

export const AvailableMarketsSchema = z.array(MarketSchema);

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
    id: AlbumIdSchema,
    images: ImagesSchema,
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.union([
      z.literal("year"),
      z.literal("month"),
      z.literal("day"),
    ]),
    restrictions: RestrictionsSchema.optional(),
    type: AlbumTypeSchema,
    uri: AlbumURISchema,
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
  id: TrackIdSchema,
  is_playable: z.boolean().optional(),
  linked_from: LinkedFromSchema.optional(),
  restrictions: RestrictionsSchema.optional(),
  name: z.string(),
  popularity: z.number().int().min(0).max(100),
  preview_url: z.string().nullable(),
  track_number: z.number().int(),
  type: TrackTypeSchema,
  uri: TrackURISchema,
  is_local: z.boolean(),
});
