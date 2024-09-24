import { useEffect, useMemo, useState } from "react";
import Title from "../components/contents_title";
import FormAdd from "../components/form_add";
import ButtonAdd from "../components/button_add";
import Card from "../components/content_card";
import HOC from "@/components/hoc";
import { useSupabaseClient } from "@/hooks/use-supabase";
import { TData } from "../../interfaces/app";
import Skeleton from "@/components/skeleton";
const Content = HOC(({ searchValue }: { searchValue: string }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [afterDelay, setAfterDelay] = useState<boolean>(false);
  const { getData, getUserSession } = useSupabaseClient();

  const data = getData<TData>();

  useEffect(() => {
    (async () => {
      const user = await getUserSession();
      if (user) {
        setIsLoggedIn(true);
      }
    })();
  }, [getUserSession]);

  const filteredData = useMemo(
    () =>
      data?.filter((element) => {
        if (searchValue) {
          const elements = element.url.includes(searchValue?.toLowerCase());
          return elements;
        }
        return element;
      }),
    [searchValue, data]
  );

  useEffect(() => {
    setAfterDelay(false);
    const timer = setTimeout(() => {
      setAfterDelay(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center -mt-20">
        <h3 className="text-center text-3xl text-gray-600">
          You need to be logged in
        </h3>
      </div>
    );
  }

  if (filteredData.length === 0 && !searchValue && isLoggedIn && !afterDelay) {
    return <Skeleton />;
  }

  if (afterDelay && isLoggedIn && filteredData.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center -mt-20">
        <h3 className="text-center text-3xl text-gray-600">
          Please save your favorite sites
        </h3>
        {!isOpen && <ButtonAdd {...{ setOpen, isLoggedIn }} />}
        {isOpen && <FormAdd {...{ setOpen, isOpen }} />}
      </div>
    );
  }
  if (!filteredData.length && searchValue) {
    return (
      <div className="min-h-screen flex justify-center items-center -mt-20">
        <h3 className="text-center text-3xl text-gray-600">
          Your search is unavailable
        </h3>
      </div>
    );
  }
  return (
    <>
      <Title />
      <main className="mx-4 lg:mx-10">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {filteredData?.map(({ id, url, title, created_at }) => (
            <Card key={id} {...{ id, url, title, created_at }} />
          ))}
        </div>
      </main>
      {!isOpen && <ButtonAdd {...{ setOpen, isLoggedIn }} />}
      {isOpen && <FormAdd {...{ setOpen, isOpen }} />}
    </>
  );
});

export default Content;
