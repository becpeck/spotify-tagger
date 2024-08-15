import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

import { type SpotifyApiClient } from "@/server/spotifyWebApi/spotifyApiClient";
import { TrackIdSchema } from "@/server/spotifyWebApi/utils/schemas";

export const checkSavedTracks = async (
  spotify: SpotifyApiClient,
  trackIds: z.infer<typeof TrackIdSchema>[]
) => {
  const maxTrackIds = 50;
  const results: boolean[] = [];
  for (let i = 0; i < trackIds.length; i += maxTrackIds) {
    const chunk = trackIds.slice(i, i + maxTrackIds);
    const res = await spotify.checkSavedTracks({ queries: { ids: chunk } });
    results.push(...res);
  }
  return results;
};

const tracksRouter = createTRPCRouter({
  saveTracks: protectedProcedure
    .input(z.array(TrackIdSchema).max(50))
    .mutation(async ({ ctx, input }) => {
      return ctx.spotify.saveTracks(undefined, { queries: { ids: input } });
    }),
  unsaveTracks: protectedProcedure
    .input(z.array(TrackIdSchema).max(50))
    .mutation(async ({ ctx, input }) => {
      return ctx.spotify.removeSavedTracks(undefined, {
        queries: { ids: input },
      });
    }),
  checkSavedTracks: protectedProcedure
    .input(z.array(TrackIdSchema))
    .query(async ({ ctx, input }) => {
      return checkSavedTracks(ctx.spotify, input);
    }),
});

export default tracksRouter;
