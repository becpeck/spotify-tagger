import { forwardRef } from "react";
import { SkipBackIcon, SkipForwardIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skipButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75 text-muted-foreground hover:text-primary",
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

const skipIconVariants = cva("", {
  variants: {
    size: {
      md: "h-5 w-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SkipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof skipButtonVariants>,
    VariantProps<typeof skipIconVariants> {
  variant: "back" | "forward";
}

const SkipButton = forwardRef<HTMLButtonElement, SkipButtonProps>(
  ({ className, variant, size = "md", ...props }, ref) => {
    const Icon = variant === "back" ? SkipBackIcon : SkipForwardIcon;
    return (
      <button
        className={cn(skipButtonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <Icon className={cn(skipIconVariants({ size }))} fill="currentColor" />
      </button>
    );
  }
);
SkipButton.displayName = "SkipButton";

const SkipBackButton = forwardRef<
  HTMLButtonElement,
  Omit<SkipButtonProps, "variant">
>((props, ref) => <SkipButton {...props} variant="back" ref={ref} />);
SkipBackButton.displayName = "SkipBackButton";

const SkipForwardButton = forwardRef<
  HTMLButtonElement,
  Omit<SkipButtonProps, "variant">
>((props, ref) => <SkipButton {...props} variant="forward" ref={ref} />);
SkipForwardButton.displayName = "SkipForwardButton";

export { SkipBackButton, SkipForwardButton };
