import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";
import { type RouterOutputs } from "@/lib/trpc/client";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";

interface PageContentProps {
  imageUrl: string;
  duration_ms: number;
  data: PlaylistTrack[];
  playlist: RouterOutputs["playlist"]["getPlaylistData"];
}
export default function PageContent({
  imageUrl,
  duration_ms,
  data,
  playlist,
}: PageContentProps) {
  const {
    collaborative,
    description,
    followers,
    id,
    images,
    is_editable,
    is_saved,
    name,
    owner,
    public: is_public, // TODO: Display in PlaylistInfo or remove
    total_tracks,
    type,
    uri,
  } = playlist;
  return (
    <>
      <PlaylistInfo
        imageUrl={imageUrl}
        type={type}
        name={name}
        description={description}
        is_editable={is_editable}
        owner={owner}
        followers={followers}
        total={total_tracks}
        duration_ms={duration_ms}
      />
      <TrackTable
        tracks={data}
        playlist={{
          collaborative,
          id,
          images,
          is_editable,
          is_saved,
          name,
          owner: {
            display_name: owner.display_name,
            id: owner.id,
            type: owner.type,
            uri: owner.uri,
          },
          type,
          uri,
        }}
      />
    </>
  );
}
