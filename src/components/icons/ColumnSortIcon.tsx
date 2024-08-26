import { PlayIcon } from "lucide-react";
import { type SortDirection } from "@tanstack/table-core";
import { cn } from "@/lib/utils";

export default function ColumnSortIcon({
  sorting,
}: {
  sorting: false | SortDirection;
}) {
  return (
    <PlayIcon
      className={cn(
        "h-3 w-3 scale-x-75",
        sorting === "asc" ? "-rotate-90" : "rotate-90"
      )}
      stroke={sorting ? "hsl(var(--green))" : "hsl(var(--background))"}
      fill={sorting ? "hsl(var(--green))" : "hsl(var(--background))"}
    />
  );
}
