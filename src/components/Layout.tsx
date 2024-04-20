import { Inter } from "next/font/google";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={cn(
        "flex flex-col h-[100vh] bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <Header />
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
    </main>
  );
}
