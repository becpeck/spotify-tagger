import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const meRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.spotify.getMyProfile();
  }),
  getInitStoreProps: protectedProcedure.query(async ({ ctx }) => {
    const userPlaylists = await ctx.spotify.getMyPlaylists();
    const userAlbums = await ctx.spotify.getMyAlbums();
    return {
      user: {
        id: ctx.session.user.spotifyId,
        name: ctx.session.user.name,
      },
      userAlbums: userAlbums.items.map(({ album }) => ({
        id: album.id,
        images: album.images,
        name: album.name,
        uri: album.uri,
        artists: album.artists.map(artist => ({ id: artist.id, name: artist.name })),
        type: album.type,
      })),
      userPlaylists: userPlaylists.items.map((playlist) => ({
        collaborative: playlist.collaborative,
        id: playlist.id,
        images: playlist.images,
        name: playlist.name,
        uri: playlist.uri,
        owner: {
          display_name: playlist.owner.display_name,
          id: playlist.owner.id,
          type: playlist.owner.type,
          uri: playlist.owner.uri,
        },
        type: playlist.type,
      })),
    };
  }),
});

export default meRouter;
