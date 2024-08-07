import { z } from "zod";
import { makeEndpoint, makeErrors } from "@zodios/core";

import {
  ExternalUrlsSchema,
  FollowersSchema,
  ImagesSchema,
  UserIdSchema,
  UserTypeSchema,
  UserURISchema,
} from "@/server/spotifyWebApi/utils/schemas";
import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

const getUserProfile = makeEndpoint({
  method: "get",
  path: "/:user_id",
  alias: "getUserProfile",
  response: z.object({
    display_name: z.string().nullable(),
    external_urls: ExternalUrlsSchema,
    followers: FollowersSchema,
    href: z.string(),
    id: UserIdSchema,
    images: ImagesSchema,
    type: UserTypeSchema,
    uri: UserURISchema,
  }),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});

export default getUserProfile;
