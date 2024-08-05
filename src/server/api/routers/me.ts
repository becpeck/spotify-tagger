import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const meRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.spotify.getMyProfile();
  }),
});

export default meRouter;
