import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

import {
  ExplicitContentSchema,
  ExternalUrlsSchema,
  FollowersSchema,
  ImagesSchema,
  ProductSchema,
} from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const getMyProfile = makeEndpoint({
  method: "get",
  path: "",
  alias: "getMyProfile",
  response: z.object({
    country: z.string(),
    display_name: z.string().nullable(),
    email: z.string(),
    explicit_content: ExplicitContentSchema,
    external_urls: ExternalUrlsSchema,
    followers: FollowersSchema,
    href: z.string(),
    id: z.string(),
    images: ImagesSchema,
    product: ProductSchema,
    type: z.literal("user"),
    uri: z.string(),
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getMyProfile;
