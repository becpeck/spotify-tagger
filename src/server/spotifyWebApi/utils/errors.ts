import { z } from "zod";
import { type ZodiosEndpointError } from "@zodios/core";

export const ErrorResponse401: ZodiosEndpointError = {
  status: 401,
  schema: z.object({
    status: z.literal(401),
    message: z.string(),
  }),
  description:
    "Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.",
};

export const ErrorResponse403: ZodiosEndpointError = {
  status: 403,
  schema: z.object({
    status: z.literal(403),
    message: z.string(),
  }),
  description:
    "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.",
};

export const ErrorResponse429: ZodiosEndpointError = {
  status: 429,
  schema: z.object({
    status: z.literal(429),
    message: z.string(),
  }),
  description: "The app has exceeded its rate limits.",
};
