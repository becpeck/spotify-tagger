import Head from "next/head";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Tagger</title>
        <meta name="description" content="meta description content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center px-4 py-4">
        <h1 className="text-xl font-semibold">Spotify Tagger</h1>
      </header>
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
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
