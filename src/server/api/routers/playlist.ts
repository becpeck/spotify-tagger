import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

import { PlaylistIdSchema } from "@/server/spotifyWebApi/utils/schemas";
import { checkSavedTracks } from "@/server/api/routers/tracks";

const playlistRouter = createTRPCRouter({
  getPlaylistData: protectedProcedure
    .input(PlaylistIdSchema)
    .query(async ({ input, ctx }) => {
      const playlist = await ctx.spotify.getPlaylist({
        params: { playlist_id: input },
      });
      const isFollowing = await ctx.spotify.isFollowingPlaylist({
        params: { playlist_id: input },
      });
      const isSaved = await checkSavedTracks(
        ctx.spotify,
        // filter out local tracks with null ids
        playlist.tracks.items.reduce((filtered, track) => {
          if (!track.is_local) {
            filtered.push(track.track.id);
          }
          return filtered;
        }, new Array<string>())
      );
      return {
        ...playlist,
        total_tracks: playlist.tracks.total,
        tracks: playlist.tracks.items.map(({ track, ...rest }, i) => ({
          ...rest,
          ...track,
          restrictions:
            !track.restrictions?.reason && !track.is_local
              ? track.explicit && ctx.session.user.explicitFiltered
                ? { reason: "explicit" }
                : track.restrictions
              : track.restrictions,
          is_saved: track.is_local ? false : isSaved[i]!,
        })),
        is_saved: isFollowing,
        is_editable: playlist.owner.id === ctx.session.user.spotifyId,
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
  updatePlaylist: protectedProcedure
    .input(
      z.object({
        image: z.string().optional(),
        id: PlaylistIdSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.image) {
        await ctx.spotify.updateCoverImage(input.image, {
          params: { playlist_id: input.id },
        });
      }
    }),
});

export default playlistRouter;
