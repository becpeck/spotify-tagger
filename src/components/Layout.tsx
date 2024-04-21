import { type NextFontWithVariable } from "next/dist/compiled/@next/font";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
        <ResizablePanel defaultSize={20} minSize={10}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
