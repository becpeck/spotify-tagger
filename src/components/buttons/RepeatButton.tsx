import { forwardRef } from "react";
import { RepeatIcon, Repeat1Icon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

const repeatIconVariants = cva("", {
  variants: {
    repeat_mode: {
      0: "text-muted-foreground hover:text-primary",
      1: "text-green-500",
      2: "text-green-500",
    },
  },
});

export interface RepeatButtonProps
  extends Omit<IconButtonProps, "Icon">,
    VariantProps<typeof repeatIconVariants> {
  repeat_mode: 0 | 1 | 2;
}

const RepeatButton = forwardRef<HTMLButtonElement, RepeatButtonProps>(
  ({ repeat_mode, size = "lg", iconClassName, ...props }, ref) => {
    const Icon = repeat_mode === 2 ? Repeat1Icon : RepeatIcon;
    return (
      <IconButton
        aria-label={
          repeat_mode === 2
            ? "Turn off repeat"
            : `Set repeat to ${repeat_mode === 0 ? "context" : "track"}`
        }
        {...props}
        ref={ref}
        Icon={Icon}
        size={size}
        iconClassName={cn(repeatIconVariants({ repeat_mode }), iconClassName)}
      />
    );
  }
);
RepeatButton.displayName = "RepeatButton";

export default RepeatButton;
