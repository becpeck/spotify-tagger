import { z, literal } from 'zod';

export const AvailableMarketsSchema = z.array(z.string().length(2));

export const ExternalUrlsSchema = z.object({
    spotify: z.string().url(),
});

export const ImagesSchema = z.array(z.object({
    url: z.string().url(),
    height: z.number(),
    width: z.number(),
}));

export const RestrictionsSchema = z.object({
    reason: z.union([
        literal('market'),
        literal('product'),
        literal('explicit'),
    ]),
});

export const CopyrightsSchema = z.array(z.object({
    text: z.string(),
    type: z.union([
        literal('C'),
        literal('P'),
    ]),
}));

export const ExternalIdsSchema = z.object({
    isrc: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
});

export const PopularitySchema = z.number().int().gte(0).lte(100);
