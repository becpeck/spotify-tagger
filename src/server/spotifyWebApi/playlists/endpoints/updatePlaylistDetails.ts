import { z } from "zod";
import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";

import {
  ErrorResponse401,
  ErrorResponse403,
  ErrorResponse429,
} from "@/server/spotifyWebApi/utils/errors";

export const UpdatePlaylistDetailsBodySchema = z
  .object({
    name: z.string(),
    public: z.boolean(),
    collaborative: z.boolean(),
    description: z.string(),
  })
  .partial()
  .refine(({ public: isPublic, collaborative }) => {
    // return isPublic === true ? !collaborative : true;
    return !isPublic || !collaborative;
  });

const updatePlaylistDetails = makeEndpoint({
  method: "put",
  path: "/:playlist_id",
  alias: "updatePlaylistDetails",
  parameters: parametersBuilder()
    .addBody(UpdatePlaylistDetailsBodySchema)
    .build(),
  response: z.object({}),
  errors: makeErrors([ErrorResponse401, ErrorResponse403, ErrorResponse429]),
});
z;
export default updatePlaylistDetails;
