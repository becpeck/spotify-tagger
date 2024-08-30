import { forwardRef } from "react";
import { RepeatIcon, Repeat1Icon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const repeatButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75",
  {
    variants: {
      size: {
        md: "h-7 w-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const repeatIconVariants = cva("", {
  variants: {
    size: {
      md: "h-5 w-5",
    },
    repeat_mode: {
      0: "text-muted-foreground hover:text-primary",
      1: "text-green-500",
      2: "text-green-500",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface RepeatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof repeatButtonVariants>,
    VariantProps<typeof repeatIconVariants> {
  repeat_mode: 0 | 1 | 2;
}

const RepeatButton = forwardRef<
  HTMLButtonElement,
  Omit<RepeatButtonProps, "aria-label">
>(({ className, repeat_mode, size = "md", ...props }, ref) => {
  const Icon = repeat_mode === 2 ? Repeat1Icon : RepeatIcon;
  return (
    <button
      className={cn(repeatButtonVariants({ size }), className)}
      ref={ref}
      {...props}
      aria-label={
        repeat_mode === 2
          ? "Turn off repeat"
          : `Set repeat to ${repeat_mode === 0 ? "context" : "track"}`
      }
    >
      <Icon className={cn(repeatIconVariants({ size, repeat_mode }))} />
    </button>
  );
});
RepeatButton.displayName = "RepeatButton";

export default RepeatButton;
