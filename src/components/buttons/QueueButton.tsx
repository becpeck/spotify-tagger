import { forwardRef } from "react";
import { ListMusicIcon } from "lucide-react";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";

const QueueButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "Icon">
>(({ size = "md", ...props }, ref) => (
  <IconButton {...props} ref={ref} Icon={ListMusicIcon} size={size} />
));
QueueButton.displayName = "QueueButton";

export default QueueButton;
