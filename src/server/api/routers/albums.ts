import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AlbumIdSchema } from "@/server/spotifyWebApi/utils/schemas";

const albumsRouter = createTRPCRouter({
  getAlbumData: protectedProcedure
    .input(AlbumIdSchema)
    .query(({ input, ctx }) => {
      return ctx.spotify.getAlbum({ params: { album_id: input } });
    }),
});

export default albumsRouter;
