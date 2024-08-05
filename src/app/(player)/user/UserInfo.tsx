import Image from "next/image";
import { HeartIcon } from "lucide-react";

type PlaylistInfoProps = {
  display_name: string;
  followers: { total: number };
  imageUrl: string;
  type: string;
};

export default function UserInfo({
  display_name,
  followers,
  imageUrl,
  type,
}: PlaylistInfoProps) {

  return (
    <header className="flex m-4 gap-4">
      {imageUrl ? (
        <Image
          className="rounded-full"
          src={imageUrl}
          height={200}
          width={200}
          alt={`${display_name} profile photo`}
          priority
        />
      ) : null}
      <div>
        <h4 className="capitalize">{type}</h4>
        <h1 className="text-5xl font-bold">{display_name}</h1>
        {/* Todo: add number of public playlists */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
          <HeartIcon size={15} stroke="hsl(var(--muted-foreground))" />
          <span>{followers.total} followers</span>
        </div>
        {/* Todo: add number of followed artists/profiles */}
        {/* Todo: add "follows you" label */}
      </div>
    </header>
  );
}
