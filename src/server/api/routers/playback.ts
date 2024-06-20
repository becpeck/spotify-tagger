import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import spotifyApiClient from "@/server/spotifyWebApi/spotifyApiClient";

const repeatModes = ["off", "context", "track"] as const;

export const playbackRouter = createTRPCRouter({
  transferToDevice: protectedProcedure
    .input(
      z.object({
        device_id: z.string(),
        play: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await spotifyApiClient.transferPlayback(
        { ...input },
        { headers: { Authorization: `Bearer ${ctx.session.access_token}` } }
      );
    }),
  toggleShuffle: protectedProcedure
    .input(
      z.object({
        state: z.boolean(),
        device_id: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await spotifyApiClient.toggleShuffle(
        {},
        {
          headers: { Authorization: `Bearer ${ctx.session.access_token}` },
          queries: { ...input },
        }
      );
    }),
  cycleRepeat: protectedProcedure
    .input(z.number().int().min(0).max(2))
    .mutation(async ({ input, ctx }) => {
      return await spotifyApiClient.setRepeatMode(
        {},
        {
          headers: { Authorization: `Bearer ${ctx.session.access_token}` },
          queries: { state: repeatModes[(input + 1) % 3]! },
        }
      );
    }),
});
