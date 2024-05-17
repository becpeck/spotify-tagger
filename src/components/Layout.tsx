import { type NextFontWithVariable } from "next/dist/compiled/@next/font";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PlaybackBar from "@/components/PlaybackBar/PlaybackBar";

import { cn } from "@/lib/utils";

export default function Layout({
  fontSans,
  children,
}: Readonly<{ fontSans: NextFontWithVariable, children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        "flex flex-col h-[100vh] bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <Header username={"username"}/>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full border"
      >
        <ResizablePanel defaultSize={15} minSize={10}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <ScrollArea className="w-full h-full">
            {children}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlaybackBar />
    </div>
  );
}
