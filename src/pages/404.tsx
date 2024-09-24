import Layout from "@/components/layout";
import Link from "next/link";
import React from "react";
import Head from "next/head";

const NotFound = () => {
  return (
    <Layout>
      <Head>
        <title>My Keeps | 404</title>
      </Head>
      <div className="min-h-screen flex flex-col space-y-2 justify-center items-center">
        <p
          className="text-2xl font-semibold text-orange-700"
          style={{ marginTop: "-50vh" }}
        >
          Page not found
        </p>
        <Link
          className="text-lg font-semibold text-yellow-600 bg-transparent border-2 p-1 rounded hover:text-white hover:bg-yellow-500"
          href="/"
          passHref
        >
          Back
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
