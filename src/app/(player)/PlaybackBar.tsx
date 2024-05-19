import CurrentlyPlaying from "@/components/PlaybackBar/CurrentlyPlaying";
import PlaybackControls from "@/components/PlaybackBar/PlaybackControls";
import QueueButton from "@/components/PlaybackBar/QueueButton";
import DeviceButton from "@/components/PlaybackBar/DeviceButton";
import VolumeControls from "@/components/PlaybackBar/VolumeControls";

export default function PlaybackBar() {
  return (
    <footer className="flex justify-between items-center w-full p-4 border gap-8">
      <CurrentlyPlaying className="grow max-w-[30%]"/>
      <PlaybackControls className="grow max-w-[40%]"/>
      <div className="grow max-w-[30%] flex justify-end items-center">
        <QueueButton />
        <DeviceButton />
        <VolumeControls />
      </div>
    </footer>
  );
}
