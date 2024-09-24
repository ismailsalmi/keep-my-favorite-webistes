import { useState, useEffect } from "react";

export const useScroll = () => {
  const [scroll, setScroll] = useState<number>(0);
  const toTop = ({ position = 0 }: { position: number }) => {
    if (typeof window !== "undefined")
      window.scrollTo({ top: position, behavior: "smooth" });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScroll(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scroll]);

  return { scroll, toTop };
};
