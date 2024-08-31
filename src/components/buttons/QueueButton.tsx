import { forwardRef } from "react";
import { ListMusicIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const queueButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-105 active:transform-none active:brightness-75",
  {
    variants: {
      size: {
        sm: "p-1",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const queueIconVariants = cva("text-muted-foreground hover:text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface QueueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof queueButtonVariants>,
    VariantProps<typeof queueIconVariants> {}

const QueueButton = forwardRef<HTMLButtonElement, QueueButtonProps>(
  ({ className, size = "sm", ...props }, ref) => {
    return (
      <button
        className={cn(queueButtonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <ListMusicIcon className={cn(queueIconVariants({ size }))} />
      </button>
    );
  }
);
QueueButton.displayName = "QueueButton";

export default QueueButton;
