import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

import {
  CountrySchema,
  ExplicitContentSchema,
  ExternalUrlsSchema,
  FollowersSchema,
  ImagesSchema,
  ProductSchema,
  UserIdSchema,
  UserTypeSchema,
  UserURISchema,
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
    country: CountrySchema,
    display_name: z.string().nullable(),
    email: z.string(),
    explicit_content: ExplicitContentSchema,
    external_urls: ExternalUrlsSchema,
    followers: FollowersSchema,
    href: z.string(),
    id: UserIdSchema,
    images: ImagesSchema,
    product: ProductSchema,
    type: UserTypeSchema,
    uri: UserURISchema,
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getMyProfile;
