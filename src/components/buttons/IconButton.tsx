import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75 text-muted-foreground hover:text-primary",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-[26px] w-[26px]",
        lg: "h-7 w-7",
        xl: "h-9 w-9",
      },
    },
  }
);

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    },
  },
});

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof iconVariants> {
  Icon: LucideIcon;
  iconClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fill?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, Icon, iconClassName, fill = false, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(buttonVariants({ size }), className)}
      >
        <Icon
          className={cn(iconVariants({ size }), iconClassName)}
          fill={fill ? "currentColor" : "none"}
        />
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export default IconButton;
