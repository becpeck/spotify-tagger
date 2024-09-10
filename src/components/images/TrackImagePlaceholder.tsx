import { MusicIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackImagePlaceholderProps {
  className?: string;
}

export default function TrackImagePlaceholder({
  className,
}: TrackImagePlaceholderProps) {
  return (
    <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
      <MusicIcon className="w-[50%] h-[50%] mr-[7%]" />
    </div>
  );
}
