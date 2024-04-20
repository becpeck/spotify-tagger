import "@/styles/globals.css";
import { type AppType } from "next/app";
import Layout from "@/components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
