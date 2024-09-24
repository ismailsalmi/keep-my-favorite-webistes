import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({
  isFullScreen = true,
  dimentions = "w-10 h-10",
}: {
  isFullScreen?: boolean;
  dimentions?: `w-${number} h-${number}`;
}) => {
  return (
    <div
      className={
        isFullScreen
          ? "min-h-screen w-full flex justify-center items-center "
          : ""
      }
    >
      <Loader2 className={`animate-spin ${dimentions} text-orange-300`} />
    </div>
  );
};

export default Loader;
