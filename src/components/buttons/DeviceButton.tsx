import { forwardRef } from "react";
import { MonitorSpeakerIcon } from "lucide-react";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";

const DeviceButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "Icon">
>(({ size = "md", ...props }, ref) => (
  <IconButton {...props} ref={ref} Icon={MonitorSpeakerIcon} size={size} />
));
DeviceButton.displayName = "DeviceButton";

export default DeviceButton;
