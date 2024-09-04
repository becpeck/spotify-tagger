import Link from "next/link";
import {
  HeartIcon,
  Volume2Icon,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex justify-between items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-muted/70",
  {
    variants: {
      isCurrentPage: {
        true: "bg-accent hover:bg-accent text-accent-foreground",
      },
    },
  }
);
interface SidebarItemProps {
  className?: string;
  href: string;
  isCurrentPage: boolean;
  isPlaybackContext: boolean | null;
  isPlaying: boolean | null;
  name: string;
  type: "playlist" | "album" | "artist";
}

export default function SidebarItem({
  className,
  href,
  isCurrentPage,
  isPlaybackContext,
  isPlaying,
  name,
  type,
}: SidebarItemProps) {
  const isLikedSongs = href === "/collection/tracks";
  return (
    <li className="w-full">
      <Link
        href={href}
        className={cn(sidebarItemVariants({ isCurrentPage }), className)}
      >
        <div className="flex items-center gap-1">
          {isLikedSongs && (
            <HeartIcon
              className="h-4 w-4 shrink-0 text-green-500 mr-1"
              fill="currentColor"
            />
          )}
          <div
            className={cn(
              "truncate whitespace-normal break-all line-clamp-1",
              isPlaybackContext ? "text-green-500" : ""
            )}
          >
            {name}
          </div>
          <span className="text-muted-foreground text-xs before:content-['•'] flex items-center gap-1 capitalize">
            {type}
          </span>
        </div>
        {isPlaying && (
          <Volume2Icon className="w-4 h-4 shrink-0 text-green-500" />
        )}
      </Link>
    </li>
  );
}
