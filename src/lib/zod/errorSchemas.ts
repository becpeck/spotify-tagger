import { z, literal } from 'zod';

export const BaseSpotifyErrorSchema = z.object({
    error: z.object({
        status: z.number(),
        message: z.string(),
    }),
});

export const InvalidIdErrorSchema = BaseSpotifyErrorSchema.extend({
    error: BaseSpotifyErrorSchema.shape.error.extend({
        status: literal(400),
        message: literal('invalid id'),
    }),
});

export const InvalidAccessTokenErrorSchema = BaseSpotifyErrorSchema.extend({
    error: BaseSpotifyErrorSchema.shape.error.extend({
        status: literal(401),
        message: literal('Invalid access token'),
    })
})

export type BaseSpotifyErrorResponse = z.infer<typeof BaseSpotifyErrorSchema>;
export type InvalidIdErrorResponse = z.infer<typeof InvalidIdErrorSchema>;
export type InvalidAccessTokenErrorResponse = z.infer<typeof InvalidAccessTokenErrorSchema>;