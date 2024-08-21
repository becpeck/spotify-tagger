import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  AlbumIdSchema,
  AlbumTypeSchema,
  AlbumURISchema,
  ArtistIdSchema,
  ArtistTypeSchema,
  ArtistURISchema,
  PlaylistIdSchema,
  PlaylistTypeSchema,
  PlaylistURISchema,
  TrackIdSchema,
  TrackURISchema,
} from "@/server/spotifyWebApi/utils/schemas";

const repeatModes = ["off", "context", "track"] as const;

const playbackRouter = createTRPCRouter({
  transferToDevice: protectedProcedure
    .input(
      z.object({
        device_id: z.string(),
        play: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.transferPlayback({ ...input });
    }),
  toggleShuffle: protectedProcedure
    .input(
      z.object({
        state: z.boolean(),
        device_id: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.toggleShuffle({}, { queries: { ...input } });
    }),
  cycleRepeat: protectedProcedure
    .input(z.number().int().min(0).max(2))
    .mutation(({ input, ctx }) => {
      return ctx.spotify.setRepeatMode(
        {},
        { queries: { state: repeatModes[(input + 1) % 3]! } }
      );
    }),
  playWithContext: protectedProcedure
    .input(
      z.object({
        context: z
          .object({
            uri: AlbumURISchema.or(ArtistURISchema).or(PlaylistURISchema),
          })
          .or(
            z.object({
              type: AlbumTypeSchema.or(ArtistTypeSchema).or(PlaylistTypeSchema),
              id: AlbumIdSchema.or(ArtistIdSchema).or(PlaylistIdSchema),
            })
          ),
        offset: z
          .object({
            position: z.number().int().min(0),
          })
          .or(
            z.object({
              uri: TrackURISchema,
            })
          )
          .or(
            z.object({
              track_id: TrackIdSchema,
            })
          )
          .optional(),
        position_ms: z.number().int().min(0).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { context, offset, position_ms } = input;
      return ctx.spotify.startPlayback({
        context_uri:
          "uri" in context
            ? context.uri
            : `spotify:${context.type}:${context.id}`,
        ...(offset
          ? "uri" in offset
            ? { offset: { uri: offset.uri } }
            : "track_id" in offset
              ? { uri: `spotify:track:${offset.track_id}` }
              : { position: offset.position }
          : {}),
        ...(position_ms ? { position_ms } : {}),
      });
    }),
  playUris: protectedProcedure
    .input(
      z.object({
        uris: z.array(TrackURISchema),
        position_ms: z.number().int().min(0).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.spotify.startPlayback(input);
    }),
});

export default playbackRouter;
