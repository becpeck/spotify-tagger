import { forwardRef } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const playPauseButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-500 hover:bg-green-500 text-background hover:transform hover:scale-105 active:transform-none active:brightness-75 h-10 w-10 shadow",
  {
    variants: {},
  }
);

export interface PlayPauseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof playPauseButtonVariants> {
  isPlaying: boolean;
}

const PlayPauseButton = forwardRef<HTMLButtonElement, PlayPauseButtonProps>(
  ({ isPlaying, ...props }, ref) => {
    const Icon = isPlaying ? PauseIcon : PlayIcon;
    return (
      <button className={cn(playPauseButtonVariants())} ref={ref} {...props}>
        <Icon className="h-5 w-5" fill="currentColor" />
      </button>
    );
  }
);
PlayPauseButton.displayName = "PlayPauseButton";

export default PlayPauseButton;
