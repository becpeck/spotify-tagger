import { forwardRef } from "react";
import { EllipsisIcon } from "lucide-react";
import IconButton, {
  type IconButtonProps,
} from "@/components/buttons/IconButton";

const MoreOptionsButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "Icon">
>(({ size = "xl", ...props }, ref) => (
  <IconButton {...props} ref={ref} Icon={EllipsisIcon} size={size} />
));
MoreOptionsButton.displayName = "MoreOptionsButton";

export default MoreOptionsButton;
