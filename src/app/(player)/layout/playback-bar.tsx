import CurrentlyPlaying from "@/app/(player)/layout/playback-bar/currently-playing";
import PlaybackControls from "@/app/(player)/layout/playback-bar/playback-controls";
import QueueButton from "@/app/(player)/layout/playback-bar/queue-button";
import DeviceButton from "@/app/(player)/layout/playback-bar/device-button";
import VolumeControls from "@/app/(player)/layout/playback-bar/volume-controls";

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
