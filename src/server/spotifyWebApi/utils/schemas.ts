import { z } from "zod";

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

export const ImagesSchema = z.array(
  z.object({
    url: z.string(),
    height: z.number().int().nullable(),
    width: z.number().int().nullable(),
  })
);

export const ProductSchema = z.union([
  z.literal("premium"),
  z.literal("free"),
  z.literal("open"),
  z.string(),
]);
