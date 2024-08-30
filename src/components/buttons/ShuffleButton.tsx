import { forwardRef } from "react";
import { ShuffleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const shuffleButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75",
  {
    variants: {
      isShuffleOn: {
        true: "text-green-500 hover:text-green-500",
        false: "text-muted-foreground hover:text-primary",
      },
      size: {
        md: "h-7 w-7",
        lg: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const shuffleIconVariants = cva("", {
  variants: {
    size: {
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface ShuffleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shuffleButtonVariants>,
    VariantProps<typeof shuffleIconVariants> {
  isShuffleOn: boolean;
  size?: "md" | "lg";
}

const ShuffleButton = forwardRef<HTMLButtonElement, ShuffleButtonProps>(
  ({ className, isShuffleOn, size, ...props }, ref) => {
    return (
      <button
        className={cn(shuffleButtonVariants({ isShuffleOn, size }), className)}
        ref={ref}
        {...props}
      >
        <ShuffleIcon className={cn(shuffleIconVariants({ size }))} />
      </button>
    );
  }
);
ShuffleButton.displayName = "ShuffleButton";

export default ShuffleButton;
