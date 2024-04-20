import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={cn(
        "h-[100vh] bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
