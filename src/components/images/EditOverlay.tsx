import { forwardRef } from "react";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  imageIsPlaceholder: boolean;
}

const EditOverlay = forwardRef<HTMLDivElement, EditOverlayProps>(
  (
    { children, className, imageIsPlaceholder, ...props }: EditOverlayProps,
    ref
  ) => {
    return (
      <div
        className={cn("grid grid-cols-1 grid-rows-1 group/edit", className)}
        {...props}
        ref={ref}
      >
        <div
          className={cn(
            "hidden group-hover/edit:flex flex-col justify-center items-center gap-2 col-span-full row-span-full z-10 rounded-sm",
            !imageIsPlaceholder && "bg-black/70"
          )}
        >
          <PencilIcon className="w-[30%] h-[30%] mt-[10%]" strokeWidth={1.5} />
          Choose photo
        </div>
        {children}
      </div>
    );
  }
);
EditOverlay.displayName = "EditOverlay";

export default EditOverlay;
