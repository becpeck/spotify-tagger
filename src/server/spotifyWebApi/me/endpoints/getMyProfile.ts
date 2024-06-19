import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

const getMyProfile = makeEndpoint({
  method: "get",
  path: "",
  alias: "getMyProfile",
  response: z.object({
    country: z.string(),
    display_name: z.string().nullable(),
    email: z.string(),
    explicit_content: z.object({
      filter_enabled: z.boolean(),
      filter_locked: z.boolean(),
    }),
    external_urls: z.object({
      spotify: z.string(),
    }),
    followers: z.object({
      href: z.string().nullable(),
      total: z.number().int(),
    }),
    href: z.string(),
    id: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
        height: z.number().int().nullable(),
        width: z.number().int().nullable(),
      }),
    ),
    product: z.union([
      z.literal("premium"),
      z.literal("free"),
      z.literal("open"),
      z.string(),
    ]),
    type: z.literal("user"),
    uri: z.string(),
  }),
  errors: makeErrors([
    {
      status: 401,
      schema: z.object({
        status: z.literal(401),
        message: z.string(),
      }),
      description: "Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user."
    },
    {
      status: 403,
      schema: z.object({
        status: z.literal(403),
        message: z.string(),
      }),
      description: "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here."
    },
    {
      status: 429,
      schema: z.object({
        status: z.literal(429),
        message: z.string(),
      }),
      description: "The app has exceeded its rate limits."
    },
  ]),
});

export default getMyProfile;
