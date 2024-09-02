import { forwardRef } from "react";
import { ShuffleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

const shuffleButtonVariants = cva("", {
  variants: {
    isShuffleOn: {
      true: "text-green-500 hover:text-green-500",
      false: "text-muted-foreground hover:text-primary",
    },
  },
});

export interface ShuffleButtonProps
  extends Omit<IconButtonProps, "Icon">,
    VariantProps<typeof shuffleButtonVariants> {
  isShuffleOn: boolean;
}

const ShuffleButton = forwardRef<HTMLButtonElement, ShuffleButtonProps>(
  ({ isShuffleOn, className, size = "xl", ...props }, ref) => (
    <IconButton
      {...props}
      ref={ref}
      Icon={ShuffleIcon}
      size={size}
      className={cn(shuffleButtonVariants({ isShuffleOn }), className)}
    />
  )
);
ShuffleButton.displayName = "ShuffleButton";

export default ShuffleButton;
