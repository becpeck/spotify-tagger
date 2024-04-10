import { z } from 'zod';

export const AlbumURISchema = z.custom<`spotify:album:${string}`>((val) => /^spotify:album:[a-zA-Z0-9]+$/g.test(String(val)));
export const AlbumHrefSchema = z.custom<`https://api.spotify.com/v1/albums/${string}`>((val) => 
    /https:\/\/api.spotify.com\/v1\/albums\/[a-zA-Z0-9]+/g.test(String(val))
);