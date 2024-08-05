import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.spotify.getUserProfile({
      params: { user_id: input },
    });
  }),
});

export default userRouter;
