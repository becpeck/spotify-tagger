import { useState } from "react";
import { PlayIcon, PauseIcon, PlusIcon, CheckIcon, EllipsisIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function PlaylistControls({ name }: { name: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleIsSaved = () => setIsSaved(!isSaved);
  const toggleIsPlaying = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex items-center gap-4 m-4">
      <button
        className="flex justify-center items-center rounded-full h-10 w-10 bg-green-500 hover:transform hover:scale-105 active:brightness-75"
        onClick={toggleIsPlaying}
        type="button"
        aria-label={isPlaying ? `Pause ${name}` : `Play ${name}`}
      >
        {isPlaying
          ? <PauseIcon
              size={20}
              stroke="hsl(var(--background))"
              fill="hsl(var(--background))"
            />
          : <PlayIcon
              size={18}
              stroke="hsl(var(--background))"
              fill="hsl(var(--background))"
            />
        }
      </button>
      <button
        className={cn(
          "flex justify-center items-center rounded-full h-6 w-6 active:brightness-75",
          isSaved 
            ? "bg-green-500 hover:transform hover:scale-105" 
            : "[--plus-color:--muted-foreground] hover:[--plus-color:--primary] border-2 border-[hsl(var(--plus-color))]"
        )}
        onClick={toggleIsSaved}
        type="button"
        aria-label={isSaved ? "Remove from Library" : "Save to Library"}
      >
        {isSaved
          ? <CheckIcon
              size={16}
              strokeWidth={3}
              stroke="hsl(var(--background))"
            />
          : <PlusIcon
              size={16}
              strokeWidth={3}
              stroke="hsl(var(--plus-color))"
            />
        }
      </button>
      <EllipsisIcon
        role="button"
        size={24}
        className="[--ellipsis-color:--muted-foreground] hover:[--ellipsis-color:--primary] active:brightness-75"
        stroke="hsl(var(--ellipsis-color))"
        aria-label={`More options for ${name}`}
      />
    </div>
  );
}
