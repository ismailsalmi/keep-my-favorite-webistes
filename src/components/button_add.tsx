import React from "react";
import { useScroll } from "../hooks/use_scroll_hook";
import { Link, ChevronUp } from "lucide-react";
import { StateAction } from "../../interfaces/app";
import HOC from "./hoc";

const ButtonAdd = ({
  setOpen,
  isLoggedIn,
}: {
  setOpen: StateAction<boolean>;
  isLoggedIn: boolean;
}) => {
  const { scroll, toTop } = useScroll();
  const handleEvent = () => {
    if (scroll! > 500) {
      toTop({ position: 0 });
    } else {
      setOpen(true);
    }
  };
  return (
    <button
      onClick={handleEvent}
      className="flex fixed ring-1 ring-gray-400 bottom-2 right-2 transform hover:scale-90 duration-300 justify-center items-center bg-gray-300 shadow shadow-gray-300 hover:bg-yellow-100 rounded-full text-center w-10 h-10"
    >
      {isLoggedIn && (
        <>
          {scroll! > 500 ? (
            <ChevronUp className="text-black font-bold text-xl" />
          ) : (
            <Link className="text-black font-bold text-xl" />
          )}
        </>
      )}

      {!isLoggedIn && scroll! > 500 && (
        <ChevronUp className="text-black font-bold text-xl" />
      )}
    </button>
  );
};

export default HOC(ButtonAdd);
