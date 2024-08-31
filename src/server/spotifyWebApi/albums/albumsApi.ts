import { apiBuilder } from "@zodios/core";
import getAlbum from "@/server/spotifyWebApi/albums/endpoints/getAlbum";

const albumsApi = apiBuilder().addEndpoint(getAlbum).build();

export default albumsApi;
