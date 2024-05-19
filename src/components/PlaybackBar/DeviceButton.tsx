"use client";

import { MonitorSpeakerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DeviceButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "[--devices-color:--muted-foreground] hover:[--devices-color:--primary]",
        "rounded-full hover:transform hover:scale-105 active:transform-none active:brightness-75 hover:bg-transparent px-2"
      )}
      onClick={() => {}}
      aria-label="Devices"
    >
      <MonitorSpeakerIcon
        className="h-5 w-5"
        stroke="hsl(var(--devices-color))"
      />
    </Button>
  );
}
