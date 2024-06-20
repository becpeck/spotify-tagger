import { createTRPCRouter } from "@/server/api/trpc";
import { playerRouter } from "@/server/api/routers/player";
import { meRouter } from "@/server/api/routers/me";
import { playlistRouter } from "@/server/api/routers/playlist";

export const appRouter = createTRPCRouter({
  player: playerRouter,
  me: meRouter,
  playlist: playlistRouter,
});

export type AppRouter = typeof appRouter;
