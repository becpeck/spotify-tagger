import { createTRPCRouter } from "@/server/api/trpc";
import { playbackRouter } from "@/server/api/routers/playback";
import { meRouter } from "@/server/api/routers/me";
import { playlistRouter } from "@/server/api/routers/playlist";

export const appRouter = createTRPCRouter({
  playback: playbackRouter,
  me: meRouter,
  playlist: playlistRouter,
});

export type AppRouter = typeof appRouter;
