import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { HashIcon, PlayIcon, PauseIcon } from "lucide-react";

import { type TrackData } from "@/app/(player)/playlist/TrackTable";
import { type ExtendedCellContext } from "@/app/(player)/playlist/TrackTable/TrackTableRow";
import { Button } from "@/components/ui/button";

import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

function NumberCell(props: CellContext<TrackData, number>) {
  const { row, table, isPlaybackContext } = props as ExtendedCellContext<
    TrackData,
    number
  >;
  const { playbackState, player } = useAppStore(
    ({ playbackState, player }) => ({
      playbackState,
      player,
    })
  );
  const playContextMutation = trpc.playback.playWithContext.useMutation();
  const playUrisMutation = trpc.playback.playUris.useMutation({
    // onSuccess: () => {}   // TODO: add secondary playback state context
  });
  const isPlaying = isPlaybackContext && !playbackState!.paused;
  const Icon = isPlaying ? PauseIcon : PlayIcon;

  const toggleIsPlaying = async () => {
    if (!isPlaybackContext) {
      const tableState = table.getState();
      const sorting = tableState.sorting;
      const globalFilter = tableState.globalFilter as string;
      // TODO: change this to a function that determines whether view is different from original
      if (globalFilter.length === 0 && sorting.length === 0) {
        playContextMutation.mutate({
          context: { uri: table.options.meta!.playlist!.uri },
          offset: { uri: row.original.track.uri },
        });
      } else {
        let uris = table
          .getRowModel()
          .rows.map((row) => row.original.track.uri);
        if (uris[0] !== row.original.track.uri) {
          const index = uris.findIndex((uri) => uri === row.original.track.uri);
          uris = uris.slice(index).concat(uris.slice(0, index));
        }
        playUrisMutation.mutate({ uris });
      }
    } else {
      if (isPlaying) {
        await player!.pause.bind(player)();
      } else {
        await player!.resume.bind(player)();
      }
    }
  };

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 p-0 text-muted-foreground"
      disabled={!player}
      onClick={toggleIsPlaying}
    >
      <div
        className={cn(
          "group-hover/row:hidden tabular-nums text-base",
          isPlaybackContext && "text-green-500"
        )}
      >
        {row.original.number}
      </div>
      <div className="hidden group-hover/row:block">
        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        <Icon
          size={15}
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
        />
      </div>
    </Button>
  );
}

const numberColumn: ColumnDef<TrackData, number> = {
  accessorKey: "number",
  enableGlobalFilter: false,
  header: () => (
    <div className="w-full flex justify-center align-center">
      <span className="sr-only">Track Number</span>
      <HashIcon size={15} />
    </div>
  ),
  cell: (context) => <NumberCell {...context} />,
};

export default numberColumn;
