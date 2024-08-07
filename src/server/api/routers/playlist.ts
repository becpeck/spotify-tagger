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
    .input(PlaylistIdSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.spotify.followPlaylist({}, { params: { playlist_id: input } });
    }),
  unfollowPlaylist: protectedProcedure
    .input(PlaylistIdSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.spotify.unfollowPlaylist(undefined, {
        params: { playlist_id: input },
      });
    }),
});

export default playlistRouter;
