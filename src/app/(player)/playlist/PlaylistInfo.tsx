import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  ListMusicIcon,
  ClockIcon,
  MusicIcon,
  PencilIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toDuration, toDurationString } from "@/utils/timeUtils";
import { DialogTrigger } from "@/components/ui/dialog";

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
      <>
        {is_editable ? (
          <div className="absolute top-0 left-0 h-full w-full group-hover/edit:bg-black/70 z-10">
            <div className="hidden group-hover/edit:flex flex-col justify-center items-center gap-2 w-full h-full">
              <PencilIcon
                className="w-[30%] h-[30%] mt-[10%]"
                strokeWidth={1.5}
              />
              Choose photo
            </div>
          </div>
        ) : null}
        <Image
          src={imageUrl}
          height={250}
          width={250}
          alt={`${name} cover`}
          priority
          className={cn(
            "h-[250px] w-[250px] rounded-sm",
            is_editable && "absolute top-0 left-0"
          )}
        />
      </>
    ) : (
      <div
        className={cn(
          "h-[250px] w-[250px] rounded-sm flex items-center justify-center bg-muted text-muted-foreground group-hover/edit:text-primary"
        )}
      >
        <MusicIcon
          className="w-[35%] h-[35%] mr-[5%] group-hover/edit:hidden"
          strokeWidth={1.5}
        />
        <div className="hidden group-hover/edit:flex flex-col justify-center items-center gap-2 w-full h-full">
          <PencilIcon className="w-[30%] h-[30%] mt-[10%]" strokeWidth={1.5} />
          Choose photo
        </div>
      </div>
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
          <div className="group/edit relative h-[250px] w-[250px] shrink-0">
            <ImageComponent />
          </div>
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
