"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import { trpc } from "@/lib/trpc/client";

import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EditOverlay from "@/components/images/EditOverlay";
import PlaylistImagePlaceholder from "@/components/images/PlaylistImagePlaceholder";

const DialogFormSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(300),
  imageUrl: z.string().optional(),
  imageBase64: z.string().optional(),
});

interface EditDialogContentProps {
  focusedField: "name" | "description" | "image";
  imageUrl: string;
  playlist: {
    id: string;
    name: string;
    description: string;
  };
}

export default function EditDialogContent({
  focusedField,
  imageUrl,
  playlist,
}: EditDialogContentProps) {
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
        form.setError("imageBase64", {
          message: "Image size cannot exceed 256KB",
        });
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
      description:
        values.description !== playlist.description
          ? values.description
          : undefined,
    });
  };

  const onError = (errors: unknown) => {
    console.log(form.getValues());
    console.log(errors);
  };

  const openFileInput = () => fileInputRef.current?.click();

  const handleOpenAutoFocus = () => {
    if (focusedField === "image") {
      openFileInput();
    } else {
      form.setFocus(focusedField);
    }
  };

  return (
    <DialogContent onOpenAutoFocus={handleOpenAutoFocus}>
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
              <div className="shrink-0" onClick={openFileInput}>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className="hidden">Cover Image</FormLabel>
                      <EditOverlay
                        imageIsPlaceholder={!field.value}
                        className="w-48 h-48"
                      >
                        {field.value ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={field.value}
                            alt={`${playlist.name} image`}
                            className="col-span-full row-span-full rounded-sm w-48 h-48"
                          />
                        ) : (
                          <PlaylistImagePlaceholder insideEditOverlay />
                        )}
                      </EditOverlay>
                    </FormItem>
                  )}
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
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex justify-between items-center h-5">
                      <FormLabel>Name</FormLabel>
                      {field.value.length >= 90 ? (
                        <div className="text-xs leading-none bg-accent p-1 rounded-sm">
                          {field.value.length}/100
                        </div>
                      ) : null}
                    </div>
                    <FormControl>
                      <Input {...field} minLength={1} maxLength={100} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex justify-between items-center h-5">
                      <FormLabel>Description</FormLabel>
                      {field.value.length >= 280 ? (
                        <div className="text-xs leading-none bg-accent p-1 rounded-sm">
                          {field.value.length}/300
                        </div>
                      ) : null}
                    </div>
                    <FormControl>
                      <Textarea {...field} maxLength={300} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
