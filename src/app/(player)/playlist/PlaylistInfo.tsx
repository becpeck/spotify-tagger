import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ListMusicIcon, ClockIcon } from "lucide-react";

import { DialogTrigger } from "@/components/ui/dialog";
import EditOverlay from "@/components/images/EditOverlay";
import PlaylistImagePlaceholder from "@/components/images/PlaylistImagePlaceholder";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { toDuration, toDurationString } from "@/utils/timeUtils";

type PlaylistInfoProps = {
  imageUrl: string;
  type: string;
  name: string;
  description: string;
  is_editable: boolean;
  owner: { id: string; display_name: string };
  followers: { total: number };
  total: number;
  duration_ms: number;
  setFocusedField?: React.Dispatch<
    React.SetStateAction<"description" | "name" | "image">
  >;
};

export default function PlaylistInfo({
  imageUrl,
  type,
  name,
  description,
  is_editable,
  owner,
  followers,
  total,
  duration_ms,
  setFocusedField,
}: PlaylistInfoProps) {
  const duration = toDuration(duration_ms);

  const ImageComponent = () =>
    imageUrl ? (
      <Image
        src={imageUrl}
        height={250}
        width={250}
        alt={`${name} cover`}
        priority
        className={cn(
          "rounded-sm h-[250px] w-[250px]",
          is_editable && "col-span-full row-span-full"
        )}
      />
    ) : (
      <PlaylistImagePlaceholder insideEditOverlay={is_editable} />
    );

  const Wrapper = (props: {
    children: React.ReactNode;
    type: "name" | "description" | "image";
  }) =>
    is_editable && setFocusedField ? (
      <DialogTrigger asChild onClick={() => setFocusedField(props.type)}>
        {props.children}
      </DialogTrigger>
    ) : (
      <>{props.children}</>
    );

  return (
    <header className="flex m-4 gap-4">
      <Wrapper type="image">
        {is_editable ? (
          <EditOverlay
            imageIsPlaceholder={!imageUrl}
            className="w-[250px] h-[250px] shrink-0"
          >
            <ImageComponent />
          </EditOverlay>
        ) : (
          <ImageComponent />
        )}
      </Wrapper>
      <div className="shrink">
        <h4 className="capitalize">{type}</h4>
        <Wrapper type="name">
          <h1 className="text-4xl font-bold">{name}</h1>
        </Wrapper>
        <Wrapper type="description">
          <div className="text-muted-foreground">{description}</div>
        </Wrapper>
        <Link
          href={`/user/${owner.id}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 text-base font-semibold h-auto"
          )}
        >
          {owner.display_name || owner.id}
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <HeartIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{followers.total} likes</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ListMusicIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{total} songs</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ClockIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>
            {toDurationString(duration, {
              ...(duration.hours > 0
                ? { hours: "short" }
                : { seconds: "short" }),
              minutes: "short",
              separator: ", ",
            })}
          </span>
        </div>
      </div>
    </header>
  );
}
