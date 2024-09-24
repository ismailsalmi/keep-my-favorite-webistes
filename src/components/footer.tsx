import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="text-sm text-center pb-5 mt-32 text-gray-400">
      <p>
        Created by
        <Link
          className="font-semibold text-blue-500"
          href="https://ismailsalmi.me"
          rel="noreferrer"
          target={"_blank"}
          passHref
        >
          {" "}
          Ismail Salmi
        </Link>
      </p>
    </footer>
  );
}
