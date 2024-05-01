import { useState } from "react";
import { PlayIcon, PauseIcon, PlusIcon, CheckIcon, EllipsisIcon, CirclePlusIcon, ListMusicIcon, CopyIcon, ExternalLinkIcon, MonitorIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

type PlaylistControlsProps = {
  playlist: {
    name: string,
    type: string,
    id: string,
  },
};

export default function PlaylistControls({ playlist }: PlaylistControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleIsSaved = () => setIsSaved(!isSaved);
  const toggleIsPlaying = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex items-center gap-6 m-4">
      <button
        className="flex justify-center items-center rounded-full h-10 w-10 bg-green-500 hover:transform hover:scale-105 active:brightness-75"
        onClick={toggleIsPlaying}
        type="button"
        aria-label={isPlaying ? `Pause ${playlist.name}` : `Play ${playlist.name}`}
      >
        {isPlaying
          ? <PauseIcon
              size={20}
              stroke="hsl(var(--background))"
              fill="hsl(var(--background))"
            />
          : <PlayIcon
              size={18}
              stroke="hsl(var(--background))"
              fill="hsl(var(--background))"
            />
        }
      </button>
      <button
        className={cn(
          "flex justify-center items-center rounded-full h-6 w-6 active:brightness-75",
          isSaved 
            ? "bg-green-500 hover:transform hover:scale-105" 
            : "[--plus-color:--muted-foreground] hover:[--plus-color:--primary] border-2 border-[hsl(var(--plus-color))]"
        )}
        onClick={toggleIsSaved}
        type="button"
        aria-label={isSaved ? "Remove from Library" : "Save to Library"}
      >
        {isSaved
          ? <CheckIcon
              size={16}
              strokeWidth={3}
              stroke="hsl(var(--background))"
            />
          : <PlusIcon
              size={16}
              strokeWidth={3}
              stroke="hsl(var(--plus-color))"
            />
        }
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisIcon
            role="button"
            size={24}
            className="[--ellipsis-color:--muted-foreground] hover:[--ellipsis-color:--primary] active:brightness-75"
            stroke="hsl(var(--ellipsis-color))"
            aria-label={`More options for ${playlist.name}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2" onClick={toggleIsSaved}>
              {isSaved
                ? <>
                    <div className="flex justify-center items-center rounded-full h-[18px] w-[18px] bg-green-500">
                      <CheckIcon
                        size={12}
                        strokeWidth={3}
                        stroke="hsl(var(--background))"
                      />
                    </div>
                    Remove from Your Library
                  </>
                : <>
                    <CirclePlusIcon size={18}/>
                    Save to Your Library
                  </>
              }
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <ListMusicIcon size={18}/>
              Add to Queue
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2" onClick={() => {navigator.clipboard.writeText(`https://open.spotify.com/${track.type}/${track.id}`)}}>
              <CopyIcon size={18} />
              Copy Song Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex gap-2">
                <FontAwesomeIcon icon={faSpotify} size={'lg'}/>
                Open in Spotify
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <a
                      href={`https://open.spotify.com/${playlist.type}/${playlist.id}`}
                      target="_blank"
                    >
                      <ExternalLinkIcon size={18}/>
                      Spotify Web
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2" asChild>
                    <a
                      href={`spotify:${playlist.type}:${playlist.id}`}
                      target="_blank"
                    >
                      <MonitorIcon size={18} />
                      Desktop App
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
