import { forwardRef } from "react";
import { HeartIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

const heartButtonVariants = cva("", {
  variants: {
    isSaved: {
      true: "text-green-500 hover:text-green-500",
      false: "text-muted-foreground hover:text-primary",
    },
  },
});

export interface HeartButtonProps
  extends Omit<IconButtonProps, "Icon">,
    VariantProps<typeof heartButtonVariants> {
  isSaved: boolean;
}

const HeartButton = forwardRef<HTMLButtonElement, HeartButtonProps>(
  ({ isSaved, className, size = "xl", ...props }, ref) => (
    <IconButton
      {...props}
      ref={ref}
      Icon={HeartIcon}
      size={size}
      className={cn(heartButtonVariants({ isSaved }), className)}
      fill={isSaved}
    />
  )
);
HeartButton.displayName = "HeartButton";

export default HeartButton;
