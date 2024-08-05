import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const repeatModes = ["off", "context", "track"] as const;

const playbackRouter = createTRPCRouter({
  transferToDevice: protectedProcedure
    .input(
      z.object({
        device_id: z.string(),
        play: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.transferPlayback({ ...input });
    }),
  toggleShuffle: protectedProcedure
    .input(
      z.object({
        state: z.boolean(),
        device_id: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.toggleShuffle({}, { queries: { ...input } });
    }),
  cycleRepeat: protectedProcedure
    .input(z.number().int().min(0).max(2))
    .mutation(({ input, ctx }) => {
      return ctx.spotify.setRepeatMode(
        {},
        { queries: { state: repeatModes[(input + 1) % 3]! } }
      );
    }),
});

export default playbackRouter;
