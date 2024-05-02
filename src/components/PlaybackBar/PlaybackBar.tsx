import { ListMusicIcon, MonitorSpeakerIcon } from "lucide-react";

import VolumeControls from "@/components/PlaybackBar/VolumeControls";

export default function PlaybackControls() {
  return (
    <div className="flex justify-between items-center w-full p-4 border gap-5">
      <div>
        Currently Playing
      </div>
      <div>
        Controls
      </div>
      <div className="w-[30%] flex gap-3">
        <ListMusicIcon size={24} />
        <MonitorSpeakerIcon size={24} />
        <VolumeControls />
      </div>
    </div>
  );

}