import { MusicIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaylistImagePlaceholderProps {
  className?: string;
  insideEditOverlay?: boolean;
}

export default function PlaylistImagePlaceholder({
  className,
  insideEditOverlay = false,
}: PlaylistImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center bg-muted text-muted-foreground rounded-sm col-span-full row-span-full",
        insideEditOverlay && "group-hover/edit:text-primary",
        className
      )}
    >
      <MusicIcon
        className={cn(
          "w-[35%] h-[35%] mr-[5%]",
          insideEditOverlay && "group-hover/edit:hidden"
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
