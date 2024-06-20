import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const playlistRouter = createTRPCRouter({
  getPlaylist: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.spotify.getPlaylist({
      params: { playlist_id: input },
    });
  }),
});
