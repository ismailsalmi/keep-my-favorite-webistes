import React, { useState, useEffect, useMemo } from "react";
import { StateAction, TData } from "../../interfaces/app";
import { useSupabaseClient } from "@/hooks/use-supabase";
import HOC from "./hoc";
import { useSplitUrl } from "@/hooks/use-splite-url";
const SearchForm = HOC(({ setSearch }: { setSearch: StateAction<string> }) => {
  const [indexOfWord, setIndexOfWord] = useState<number>(0);
  const [chars, setChars] = useState<string[]>([]);
  const { splitUrl } = useSplitUrl();
  const { getData } = useSupabaseClient();
  const data = getData<TData>();

  const filteredData = useMemo(
    () =>
      data?.map((element) => {
        const elements = splitUrl(element.url);
        return elements;
      }),
    [data, splitUrl]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * filteredData.length);
      setIndexOfWord(randomNumber);
    }, 5000);
    return () => clearInterval(interval);
  }, [indexOfWord, filteredData]);

  useEffect(() => {
    const word = filteredData[indexOfWord];
    let i = 0;
    while (i < word?.length) {
      const interval = setInterval(() => {
        if (i === word?.length) {
          i = 0;
          setChars([]);
          return;
        }
        setChars((prev) => [...prev, word[i - 1]]);

        i++;
      }, 150);
      return () => clearInterval(interval);
    }
  }, [filteredData, indexOfWord]);

  return (
    <input
      name="search"
      type="search"
      onChange={(e) => setSearch(e.target.value)}
      className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border-yellow-500 focus:border-yellow-600 focus:outline-none"
      placeholder={`Search on ${chars.join("")}`}
      aria-label="Search"
      aria-describedby="button-addon2"
    />
  );
});

export default SearchForm;
