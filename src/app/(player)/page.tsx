import DebugPlayerState from "@/components/DebugPlayerState";

export default function Home() {
  return (
    <div className="flex flex-col h-full p-6">
      <span className="font-semibold mx-auto text-2xl">Homepage</span>
      <DebugPlayerState />
    </div>
  );
}
