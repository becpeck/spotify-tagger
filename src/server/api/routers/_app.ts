import { createTRPCRouter } from "@/server/api/trpc";
import playbackRouter from "@/server/api/routers/playback";
import meRouter from "@/server/api/routers/me";
import playlistRouter from "@/server/api/routers/playlist";
import userRouter from "@/server/api/routers/users";

export const appRouter = createTRPCRouter({
  playback: playbackRouter,
  me: meRouter,
  playlist: playlistRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
