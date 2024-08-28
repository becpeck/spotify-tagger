import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AlbumIdSchema } from "@/server/spotifyWebApi/utils/schemas";

import { checkSavedTracks } from "@/server/api/routers/tracks";

const albumsRouter = createTRPCRouter({
  getAlbumData: protectedProcedure
    .input(AlbumIdSchema)
    .query(async ({ input, ctx }) => {
      const albumIsSaved = await ctx.spotify.checkSavedAlbums({
        queries: { ids: [input] },
      });
      const album = await ctx.spotify.getAlbum({ params: { album_id: input } });
      const isSaved = await checkSavedTracks(
        ctx.spotify,
        album.tracks.items.map((track) => track.id)
      );
      return {
        ...album,
        tracks: album.tracks.items.map((track, i) => ({
          ...track,
          is_saved: isSaved[i]!,
        })),
        is_saved: albumIsSaved,
      };
    }),
  saveAlbums: protectedProcedure
    .input(z.array(AlbumIdSchema))
    .mutation(async ({ ctx, input }) => {
      return ctx.spotify.saveAlbums(undefined, { queries: { ids: input } });
    }),
  unsaveAlbums: protectedProcedure
    .input(z.array(AlbumIdSchema))
    .mutation(async ({ ctx, input }) => {
      return ctx.spotify.removeSavedAlbums(undefined, {
        queries: { ids: input },
      });
    }),
});

export default albumsRouter;
