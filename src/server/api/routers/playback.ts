import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import spotifyApiClient from "@/server/spotifyWebApi/spotifyApiClient";

export const playbackRouter = createTRPCRouter({
  transferToDevice: protectedProcedure
    .input(
      z.object({
        device_id: z.string(),
        play: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await spotifyApiClient.transferPlayback(
        { ...input },
        { headers: { Authorization: `Bearer ${ctx.session.access_token}` } }
      );
    }),
  // getData: publicProcedure
  //   .query(() => {
  //     return { data: "data" }
  //   }),
  // getPrivateData: protectedProcedure.query(({ ctx }) => {
  //   return { data: "private data" }
  // }),
  // create: publicProcedure.mutation(() => {
  //   return { data: "mutation complete"}
  // }),
  // createPrivate: protectedProcedure.mutation(() => {
  //   return { data: "private mutation complete" }
  // }),
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
