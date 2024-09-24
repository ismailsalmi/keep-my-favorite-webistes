import { useCallback } from "react";

export const useSplitUrl = () => {
  const splitUrl = useCallback((str: string): string => {
    let title: string | string[] = new URL(str).origin;
    if (title.includes("www.")) title = title.split("www.")[1].split(".")[0];
    else title = title.split("/")[2].split(".")[0];
    return title;
  }, []);

  return { splitUrl };
};
