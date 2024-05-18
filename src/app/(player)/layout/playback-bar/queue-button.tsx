"use client";

import { ListMusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function QueueButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "[--queue-color:--muted-foreground] hover:[--queue-color:--primary]",
        "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent px-2"
      )}
      onClick={() => {}}
      aria-label="Queue"
    >
      <ListMusicIcon className="h-5 w-5" stroke="hsl(var(--queue-color))" />
    </Button>
  );
}
