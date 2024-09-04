import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/server/auth/auth";

import { trpc } from "@/lib/trpc/server";
import TRPCReactProvider from "@/lib/trpc/TRPCReactProvider";
import { AppStoreProvider } from "@/lib/stores/AppStoreProvider";

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

  const initProps = await trpc.me.getInitStoreProps.query();

  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <AppStoreProvider initProps={initProps}>
        <div className="flex flex-col h-[100vh]">
          <Header session={session} />
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
      </AppStoreProvider>
    </TRPCReactProvider>
  );
}
