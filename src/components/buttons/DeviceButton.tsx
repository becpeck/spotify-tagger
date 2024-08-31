import { forwardRef } from "react";
import { MonitorSpeakerIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const deviceButtonVariants = cva(
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

const deviceIconVariants = cva("text-muted-foreground hover:text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface DeviceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof deviceButtonVariants>,
    VariantProps<typeof deviceIconVariants> {}

const DeviceButton = forwardRef<HTMLButtonElement, DeviceButtonProps>(
  ({ className, size = "sm", ...props }, ref) => {
    return (
      <button
        className={cn(deviceButtonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <MonitorSpeakerIcon className={cn(deviceIconVariants({ size }))} />
      </button>
    );
  }
);
DeviceButton.displayName = "DeviceButton";

export default DeviceButton;
