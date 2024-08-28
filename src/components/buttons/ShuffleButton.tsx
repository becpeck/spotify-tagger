import { ShuffleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const shuffleButtonVariants = cva(
  "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent",
  {
    variants: {
      isShuffleOn: {
        true: "text-green-500 hover:text-green-500",
        false: "text-muted-foreground hover:text-primary",
      },
    },
  }
);

const shuffleIconVariants = cva("", {
  variants: {
    size: {
      sm: "h-5 w-5",
      default: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ShuffleButtonProps
  extends VariantProps<typeof shuffleButtonVariants>,
    VariantProps<typeof shuffleIconVariants>,
    ButtonProps {
  isShuffleOn: boolean;
  size?: "sm" | "default";
}

export default function ShuffleButton({
  className,
  disabled,
  isShuffleOn,
  size,
  onClick,
}: ShuffleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(shuffleButtonVariants({ isShuffleOn }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      <ShuffleIcon className={cn(shuffleIconVariants({ size }))} />
    </Button>
  );
}
