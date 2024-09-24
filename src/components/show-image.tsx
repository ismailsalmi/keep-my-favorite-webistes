import Image from "next/image";
import React from "react";
import HOC from "./hoc";

type PropsAndAtributes = {
  url?: string;
  image: string;
  alt: string;
};

const ShowImage = ({ url, image, alt }: PropsAndAtributes) => {
  return (
    <Image
      className="w-full h-96 md:h-auto object-center md:w-1/2 rounded-t-lg text-wrap"
      src={image! || `${url}/favicon.ico`}
      alt={alt!}
      width={500}
      height={500}
      loading="lazy"
      quality={100}
      unoptimized={true}
    />
  );
};
export default HOC(ShowImage);
