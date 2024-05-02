import VolumeControls from "@/components/PlaybackControls/VolumeControls";

export default function PlaybackControls() {
  return (
    <div className="flex justify-between items-center w-full p-4 border">
      <div>
        Currently Playing
      </div>
      <div>
        Controls
      </div>
      <div className="w-[30%]">
        <VolumeControls />
      </div>
    </div>
  );

}