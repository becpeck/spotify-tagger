import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";
import { checkSavedTracks } from "@/server/api/routers/tracks";

const playlistRouter = createTRPCRouter({
  getPlaylistData: protectedProcedure
    .input(PlaylistIdSchema)
    .query(async ({ input, ctx }) => {
      const isFollowing = await ctx.spotify.isFollowingPlaylist({
        params: { playlist_id: input },
      });
      const playlist = await ctx.spotify.getPlaylist({
        params: { playlist_id: input },
      });
      const isSaved = await checkSavedTracks(
        ctx.spotify,
        playlist.tracks.items.map((track) => track.track.id)
      );
      return {
        ...playlist,
        tracks: {
          ...playlist.tracks,
          items: playlist.tracks.items.map((track, i) => ({
            ...track,
            isSaved: isSaved[i]!,
          })),
        },
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
