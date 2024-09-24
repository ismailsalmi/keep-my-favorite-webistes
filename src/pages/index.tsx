import Layout from "../components/layout";
import React, { useState } from "react";
import Header from "../components/header";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Content = dynamic(() => import("./app"), {
  ssr: false,
  loading: () => <Loader />,
});
export default function Home() {
  const [search, setSearch] = useState<string>("");
  return (
    <Layout setSearch={setSearch}>
      {!search && <Header />}
      <Content searchValue={search} />
    </Layout>
  );
}
