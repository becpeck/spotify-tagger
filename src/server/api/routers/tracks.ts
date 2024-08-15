import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

import { TrackIdSchema } from "@/server/spotifyWebApi/utils/schemas";

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
});

export default tracksRouter;
