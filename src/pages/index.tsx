import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Tagger</title>
        <meta name="description" content="meta description content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Homepage</span>
      </div>
    </>
  );
}
