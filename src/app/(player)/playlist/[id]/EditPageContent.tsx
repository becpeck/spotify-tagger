import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";
import { type RouterOutputs } from "@/lib/trpc/client";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";

interface EditPageContentProps {
  imageUrl: string;
  duration_ms: number;
  data: PlaylistTrack[];
  playlist: RouterOutputs["playlist"]["getPlaylistData"];
}
export default function EditPageContent({
  imageUrl,
  duration_ms,
  data,
  playlist,
}: EditPageContentProps) {
  const {
    collaborative,
    description,
    followers,
    id,
    images,
    is_saved,
    name,
    owner,
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
        is_editable={true}
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
