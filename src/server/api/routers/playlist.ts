import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const playlistRouter = createTRPCRouter({
  getPlaylistData: protectedProcedure
    .input(PlaylistIdSchema)
    .query(async ({ input, ctx }) => {
      const isFollowing = await ctx.spotify.isFollowingPlaylist({
        params: { playlist_id: input },
      });
      const res = await ctx.spotify.getPlaylist({
        params: { playlist_id: input },
      });
      return {
        ...res,
        isFollowing,
      };
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
