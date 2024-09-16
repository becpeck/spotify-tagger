"use client";

import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type PlaylistTrack } from "@/app/(player)/playlist/TrackTable";
import { trpc, type RouterOutputs } from "@/lib/trpc/client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TrackImagePlaceholder from "@/components/images/TrackImagePlaceholder";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface EditPageContentProps {
  imageUrl: string;
  duration_ms: number;
  data: PlaylistTrack[];
  playlist: RouterOutputs["playlist"]["getPlaylistData"];
}

const DialogFormSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(300),
  imageUrl: z.string().optional(),
  imageBase64: z.string().optional(),
});

export default function EditPageContent({
  imageUrl,
  duration_ms,
  data,
  playlist,
}: EditPageContentProps) {
  const form = useForm<z.infer<typeof DialogFormSchema>>({
    resolver: zodResolver(DialogFormSchema),
    defaultValues: {
      name: playlist.name,
      description: playlist.description,
      imageUrl: imageUrl || undefined,
      imageBase64: undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePlaylistMutation = trpc.playlist.updatePlaylist.useMutation({
    onError: (error) => {
      console.error(error);
    },
  });

  // TODO: add rendering for invalid fields and disable submit
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      form.setValue("imageUrl", URL.createObjectURL(file));
      reader.onload = () =>
        form.setValue("imageBase64", String(reader.result).split(",")[1]);
      if (file.size > 256000) {
        form.setError("imageBase64", { message: "Image size cannot exceed 256KB"});
      }
    } else {
      form.resetField("imageUrl");
      form.resetField("imageBase64");
    }
  };

  const onSubmit = async (values: z.infer<typeof DialogFormSchema>) => {
    await updatePlaylistMutation.mutateAsync({
      id: playlist.id,
      image: values.imageBase64,
      name: values.name !== playlist.name ? values.name : undefined,
      description: values.description !== playlist.description ? values.description : undefined,
    })
  };

  const onError = (errors: unknown) => {
    console.log(form.getValues())
    console.log(errors);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 shrink-0">
                  <div
                    className="shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={(({ field }) => (
                        <FormItem>
                          <FormLabel className="hidden">Cover Image</FormLabel>
                          {field.value ? 
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={field.value}
                              alt={`${playlist.name} image`}
                              className="w-48 h-48 rounded-md"
                            />
                            : <TrackImagePlaceholder className="w-48 h-48 rounded-md" />
                          }
                        </FormItem>
                      ))}
                    />
                  </div>
                  <label className="hidden">
                    Select Cover Image
                    <input
                      className="hidden"
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg"
                      onChange={handleImageChange}
                    />          
                  </label>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={(({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ))}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={(({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
