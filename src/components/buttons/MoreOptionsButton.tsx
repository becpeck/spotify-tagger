import { forwardRef } from "react";
import { EllipsisIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const moreOptionsButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75 text-muted-foreground hover:text-primary",
  {
    variants: {
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

const moreOptionsIconVariants = cva("", {
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

export interface MoreOptionsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof moreOptionsButtonVariants>,
    VariantProps<typeof moreOptionsIconVariants> {
  size?: "sm" | "lg";
}

const MoreOptionsButton = forwardRef<HTMLButtonElement, MoreOptionsButtonProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <button
        className={cn(moreOptionsButtonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <EllipsisIcon className={cn(moreOptionsIconVariants({ size }))} />
      </button>
    );
  }
);
MoreOptionsButton.displayName = "MoreOptionsButton";

export default MoreOptionsButton;
