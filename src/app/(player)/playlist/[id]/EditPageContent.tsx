"use client";

import { useState } from "react";

import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type RouterOutputs } from "@/lib/trpc/client";

import { Dialog } from "@/components/ui/dialog";
import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";
import EditDialogContent from "@/app/(player)/playlist/[id]/EditDialogContent";

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
  const [focusedField, setFocusedField] = useState<
    "name" | "description" | "image"
  >("name");

  return (
    <Dialog>
      <PlaylistInfo
        imageUrl={imageUrl}
        type={playlist.type}
        name={playlist.name}
        description={playlist.description}
        is_editable={true}
        owner={playlist.owner}
        followers={playlist.followers}
        total={playlist.total_tracks}
        duration_ms={duration_ms}
        setFocusedField={setFocusedField}
      />
      <TrackTable
        tracks={data}
        playlist={{
          collaborative: playlist.collaborative,
          id: playlist.id,
          images: playlist.images,
          is_editable: playlist.is_editable,
          is_saved: playlist.is_saved,
          name: playlist.name,
          owner: {
            display_name: playlist.owner.display_name,
            id: playlist.owner.id,
            type: playlist.owner.type,
            uri: playlist.owner.uri,
          },
          type: playlist.type,
          uri: playlist.uri,
        }}
      />
      <EditDialogContent
        focusedField={focusedField}
        imageUrl={imageUrl}
        playlist={{
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
        }}
      />
    </Dialog>
  );
}
