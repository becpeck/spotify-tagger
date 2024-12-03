"use client";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { Button } from "@/components/ui/button";

export default function DebugPlayerState() {
  const { playbackState, player } = useAppStore(
    ({ playbackState, player }) => ({
      playbackState,
      player,
    })
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="font-semibold text-lg flex gap-2">
          Playback State
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log(playbackState)}
          >
            Log
          </Button>
        </span>
        <pre className="text-xs">{JSON.stringify(playbackState, null, 2)}</pre>
      </div>
      <div>
        <span className="font-semibold text-lg flex gap-2">
          Player
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log(player)}
          >
            Log
          </Button>
        </span>
        <pre className="text-xs">{JSON.stringify(player, null, 2)}</pre>
      </div>
    </div>
  );
}
