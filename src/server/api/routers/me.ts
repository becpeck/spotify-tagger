import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const meRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.spotify.getMyProfile();
  }),
});
