import { Inter } from "next/font/google";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={cn(
        "h-[100vh] bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <Header />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full border"
      >
        <ResizablePanel defaultSize={20} minSize={10}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
