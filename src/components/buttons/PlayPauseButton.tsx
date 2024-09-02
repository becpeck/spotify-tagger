import { forwardRef } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

const playPauseButtonVariants = cva("", {
  variants: {
    variant: {
      cutout:
        "bg-green-500 hover:bg-green-500 text-background hover:text-background",
      normal: "text-muted-foreground hover:text-primary",
    },
    size: { sm: "", md: "", lg: "", xl: "" },
  },
  compoundVariants: [
    {
      variant: "cutout",
      size: "sm",
      className: "h-7 w-7",
    },
    {
      variant: "cutout",
      size: "md",
      className: "h-8 w-8",
    },
    {
      variant: "cutout",
      size: "lg",
      className: "h-9 w-9",
    },
    {
      variant: "cutout",
      size: "xl",
      className: "h-10 w-10",
    },
  ],
});

export const playPauseIconVariants = cva("", {
  variants: {
    variant: { normal: "", cutout: "" },
    size: { sm: "", md: "", lg: "", xl: "" },
  },
  compoundVariants: [
    {
      variant: "cutout",
      size: "sm",
      className: "h-[14px] w-[14px]",
    },
    {
      variant: "cutout",
      size: "md",
      className: "h-4 w-4",
    },
    {
      variant: "cutout",
      size: "lg",
      className: "h-[18px] w-[18px]",
    },
    {
      variant: "cutout",
      size: "xl",
      className: "h-5 w-5",
    },
  ],
});

export interface PlayPauseButtonProps
  extends Omit<IconButtonProps, "Icon">,
    VariantProps<typeof playPauseButtonVariants>,
    VariantProps<typeof playPauseIconVariants> {
  size?: IconButtonProps["size"];
  isPlaying: boolean;
}

const PlayPauseButton = forwardRef<HTMLButtonElement, PlayPauseButtonProps>(
  (
    {
      isPlaying,
      className,
      iconClassName,
      size = "xl",
      variant = "cutout",
      ...props
    },
    ref
  ) => (
    <IconButton
      {...props}
      ref={ref}
      Icon={isPlaying ? PauseIcon : PlayIcon}
      size={size}
      className={cn(playPauseButtonVariants({ size, variant }), className)}
      iconClassName={cn(
        playPauseIconVariants({ size, variant }),
        iconClassName
      )}
      fill
    />
  )
);

PlayPauseButton.displayName = "PlayPauseButton";

export default PlayPauseButton;
