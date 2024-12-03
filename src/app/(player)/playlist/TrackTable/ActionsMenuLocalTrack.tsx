"use client";

import { TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MoreOptionsButton from "@/components/buttons/MoreOptionsButton";
import { cn } from "@/lib/utils";

type ActionsMenuProps = {
  playlist: {
    id: string;
    is_editable: boolean;
    name: string;
    type: "playlist";
  };
  track: {
    id: null;
    is_local: true;
    name: string;
    type: "track";
    uri: `spotify:local:${string}:${string}:${string}:${number}`;
  };
};

export default function ActionsMenu({ playlist, track }: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!playlist.is_editable}>
        <MoreOptionsButton
          size="sm"
          className={cn(
            "text-background",
            playlist.is_editable && "group-hover/row:text-primary"
          )}
          aria-label={`More options for ${track.name}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {playlist.is_editable && (
            <DropdownMenuItem className="flex gap-2" onClick={() => {}}>
              {/* TODO: make button remove track from playlist */}
              <TrashIcon size="18" />
              Remove from Playlist
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
