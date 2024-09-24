import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { StrictMode } from "react";
import Head from "next/head";
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>My Keeps</title>
      </Head>
      <StrictMode>
        <Component {...pageProps} />
      </StrictMode>
    </>
  );
};

export default App;
