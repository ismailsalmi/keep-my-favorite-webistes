import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row mx-2 md:mx-8 gap-2">
      <div className="w-full h-auto md:h-80 rounded-md">
        <p className="text-center md:text-left text-6xl md:text-7xl text-yellow-600 mb-12 md:mb-0 font-bold leading-snug md:leading-snug">
          Keep your favorite sites.
        </p>
      </div>
      <Image
        className="w-full h-80 rounded-md bg-yellow-100"
        src="/img/welcome.svg"
        alt="alternative"
        width={"384"}
        height={"384"}
        blurDataURL={"blur"}
        quality={100}
        priority
      />
    </div>
  );
}
