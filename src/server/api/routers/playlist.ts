import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import spotifyApiClient from "@/server/spotifyWebApi/spotifyApiClient";

export const playlistRouter = createTRPCRouter({
  getPlaylist: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await spotifyApiClient.getPlaylist({
        headers: { Authorization: `Bearer ${ctx.session.access_token}` },
        params: { playlist_id: input },
      });
    }),
});
