import { createTRPCRouter } from "@/server/api/trpc";
import meRouter from "@/server/api/routers/me";
import playbackRouter from "@/server/api/routers/playback";
import playlistRouter from "@/server/api/routers/playlist";
import tracksRouter from "@/server/api/routers/tracks";
import userRouter from "@/server/api/routers/users";

export const appRouter = createTRPCRouter({
  me: meRouter,
  playback: playbackRouter,
  playlist: playlistRouter,
  tracks: tracksRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
