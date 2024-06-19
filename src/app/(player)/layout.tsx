import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/server/auth/auth";
import TRPCReactProvider from "@/trpc/react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

import Header from "@/app/(player)/Header";
import Sidebar from "@/app/(player)/Sidebar";
import PlaybackBar from "@/app/(player)/PlaybackBar";
import PlaybackScript from "@/app/(player)/playback/PlaybackScript";

export default async function PlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <div className="flex flex-col h-[100vh] bg-background font-sans antialiased">
        <Header session={session}/>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full border"
          >
          <ResizablePanel defaultSize={15} minSize={10}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85}>
            <ScrollArea className="w-full h-full">{children}</ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
        <PlaybackBar />
        <PlaybackScript token={session.access_token} />
      </div>
    </TRPCReactProvider>
  );
}
