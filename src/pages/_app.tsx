import "@/styles/globals.css";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* style tag workaround for dropdown menu font problem, maybe not necessary in app router? */}
      <style jsx global >{`:root { --font-sans: ${fontSans.style.fontFamily};}}`}</style>
      <Layout fontSans={fontSans}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
