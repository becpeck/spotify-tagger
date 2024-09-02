import { forwardRef } from "react";
import { SkipBackIcon, SkipForwardIcon } from "lucide-react";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";

const SkipBackButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "Icon">
>(({ size = "lg", ...props }, ref) => (
  <IconButton {...props} ref={ref} Icon={SkipBackIcon} size={size} fill />
));
SkipBackButton.displayName = "SkipBackButton";

const SkipForwardButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "Icon">
>(({ size = "lg", ...props }, ref) => (
  <IconButton {...props} ref={ref} Icon={SkipForwardIcon} size={size} fill />
));
SkipForwardButton.displayName = "SkipForwardButton";

export { SkipBackButton, SkipForwardButton };
