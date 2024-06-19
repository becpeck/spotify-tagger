import { createTRPCRouter } from "@/server/api/trpc";
import { playerRouter } from "@/server/api/routers/player";

export const appRouter = createTRPCRouter({
  player: playerRouter,
});

export type AppRouter = typeof appRouter;
