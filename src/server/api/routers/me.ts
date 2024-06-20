import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import spotifyApiClient from "@/server/spotifyWebApi/spotifyApiClient";

export const meRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    return await spotifyApiClient.getMyProfile({
      headers: { Authorization: `Bearer ${ctx.session.access_token}` },
    });
  }),
});
