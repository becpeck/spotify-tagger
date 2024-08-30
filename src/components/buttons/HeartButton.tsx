import { forwardRef } from "react";
import { HeartIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const heartButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75",
  {
    variants: {
      isSaved: {
        true: "text-green-500",
        false: "text-muted-foreground hover:text-primary",
      },
      size: {
        sm: "p-1",
        lg: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const heartIconVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface HeartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heartButtonVariants>,
    VariantProps<typeof heartIconVariants> {
  isSaved: boolean;
  size?: "sm" | "lg";
}

const HeartButton = forwardRef<HTMLButtonElement, HeartButtonProps>(
  ({ className, isSaved, size, ...props }, ref) => {
    return (
      <button
        className={cn(heartButtonVariants({ isSaved, size }), className)}
        ref={ref}
        {...props}
      >
        <HeartIcon
          className={cn(heartIconVariants({ size }))}
          {...(isSaved ? { fill: "currentColor" } : {})}
        />
      </button>
    );
  }
);
HeartButton.displayName = "HeartButton";

export default HeartButton;
