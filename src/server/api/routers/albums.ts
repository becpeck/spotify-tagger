import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AlbumIdSchema } from "@/server/spotifyWebApi/utils/schemas";

import { checkSavedTracks } from "@/server/api/routers/tracks";

const albumsRouter = createTRPCRouter({
  getAlbumData: protectedProcedure
    .input(AlbumIdSchema)
    .query(async ({ input, ctx }) => {
      const album = await ctx.spotify.getAlbum({ params: { album_id: input } });
      const isSaved = await checkSavedTracks(
        ctx.spotify,
        album.tracks.items.map((track) => track.id)
      );
      return {
        ...album,
        tracks: {
          ...album.tracks.items.map((track, i) => ({
            ...track,
            is_saved: isSaved[i]!,
          })),
        },
      };
    }),
});

export default albumsRouter;
