import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-[100vh] bg-background font-sans antialiased">
      {/* <Header username={"username"}/> */}
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full border"
      >
        <ResizablePanel defaultSize={15} minSize={10}>
          sidebar placeholder
          {/* <Sidebar /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <ScrollArea className="w-full h-full">{children}</ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <PlaybackBar /> */}
    </div>
  );
}
