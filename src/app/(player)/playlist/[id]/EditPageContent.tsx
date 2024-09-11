"use client";

import { useState, useRef } from "react";
import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { type RouterOutputs } from "@/lib/trpc/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PlaylistInfo from "@/app/(player)/playlist/PlaylistInfo";
import TrackTable from "@/app/(player)/playlist/TrackTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TrackImagePlaceholder from "@/components/images/TrackImagePlaceholder";

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
  const [image, setImage] = useState<{ url: string; file: File | undefined }>({
    url: imageUrl,
    file: undefined,
  });
  const [nameInput, setNameInput] = useState(playlist.name);
  const [descriptionInput, setDescriptionInput] = useState(
    playlist.description
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage({ url: file ? URL.createObjectURL(file) : imageUrl, file });
  };

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
      />
      <TrackTable
        tracks={data}
        playlist={{
          collaborative: playlist.collaborative,
          id: playlist.id,
          images: playlist.images,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">
          Change playlist title, description, or image
        </DialogDescription>
        <div className="flex gap-6">
          <div
            className="shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={`${playlist.name} image`}
                className="w-48 h-48 rounded-md"
              />
            ) : (
              <TrackImagePlaceholder className="w-48 h-48 rounded-md" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="flex flex-col gap-4 w-full">
            <div className="shrink-0">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className=""
              />
            </div>
            <div className="">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                className="h-full"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
