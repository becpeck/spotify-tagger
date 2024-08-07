import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const playlistRouter = createTRPCRouter({
  getPlaylist: protectedProcedure
    .input(PlaylistIdSchema)
    .query(({ input, ctx }) => {
      return ctx.spotify.getPlaylist({
        params: { playlist_id: input },
      });
    }),
  followPlaylist: protectedProcedure
    .input(
      z.object({
        id: PlaylistIdSchema,
        public: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.followPlaylist(
        { ...(input.public !== undefined ? { public: input.public } : {}) },
        { params: { playlist_id: input.id } }
      );
    }),
});

export default playlistRouter;
