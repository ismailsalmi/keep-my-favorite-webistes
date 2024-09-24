import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import HOC from "./hoc";
import { CalendarDays, ExternalLink, Trash2, Loader2 } from "lucide-react";
import { dateFormat } from "@/helpers/date-format";
import { useSupabaseClient } from "@/hooks/use-supabase";
import { TData } from "../../interfaces/app";
import DeleteModal from "./delete-modal";
import { useSplitUrl } from "@/hooks/use-splite-url";
import ShowImage from "./show-image";

const Card = ({ id, url, title, created_at }: Omit<TData, "email">) => {
  const [metaTags, setMetaTags] = useState<{
    title: string;
    image: string;
    description: string;
  }>();
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isOk, setOk] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const { deleteData } = useSupabaseClient();

  const { splitUrl } = useSplitUrl();

  const fetchData = async (url: string) => {
    try {
      const {
        data: { response, err },
      } = (await axios.post("/api/metacardvalidator", {
        url,
      })) satisfies { data: { response: string; err: string } };

      setResponse(response);
      if (err) alert(err);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  };

  const getData = (data: string) => {
    const regexp = new RegExp("<meta.*?(|</meta)>", "g");
    let metaTagsContent: Record<string, string> = {} as Record<string, string>;
    let metaTagsList: RegExpMatchArray | null = null;
    if (data) {
      metaTagsList = data.match(regexp);
      metaTagsList?.map((tag) => {
        const nameRegexp = new RegExp(
          '((?<=name=")|(?<=property=")).*?(?=")',
          "g"
        );
        const contentRegexp = new RegExp('(?<=content=").*?(?=")', "g");
        const contentRegexp1 = new RegExp("<meta*?>(.*?)</meta>", "g");
        const name = tag.match(nameRegexp);
        let content = tag.match(contentRegexp);
        content = content || tag.match(contentRegexp1);
        if (name && content) {
          const title = name[0];

          const titleName = title?.includes("og:") ? title?.slice(3) : title;
          metaTagsContent = {
            ...metaTagsContent,
            [titleName]: `${content[0]}`,
          };
        }
      });
    }
    return { metaTagsContent };
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    const { metaTagsContent } = getData(response as string);
    setMetaTags(
      metaTagsContent as unknown as {
        title: string;
        image: string;
        description: string;
      }
    );
  }, [response]);

  const handleDelete = (id: string) => {
    setShowDeleteModal(true);
    setCardId(id);
  };

  useEffect(() => {
    (async () => {
      if (isOk) {
        setLoading(true);
        const { error } = await deleteData(cardId);
        setLoading(false);
        if (error) alert(error);
      }
    })();
  }, [isOk, cardId, deleteData]);

  useEffect(() => {
    const image = new Image();
    image.src = metaTags?.image! || `${url}/favicon.ico`;
    image.onload = () => {
      setErrorImage(false);
    };
    image.onerror = () => {
      setErrorImage(true);
    };
  }, [metaTags?.image, url]);

  return (
    <>
      {showDeleteModal && <DeleteModal {...{ setShowDeleteModal, setOk }} />}
      <div className="relative flex justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 bg-white hover:bg-yellow-100 cursor-pointer rounded">
        <div className="flex flex-col md:flex-row md:max-w-xl">
          {!errorImage ? (
            <ShowImage
              {...{ url, image: metaTags?.image!, alt: metaTags?.title! }}
            />
          ) : (
            <ShowImage {...{ image: "/img/welcome.svg", alt: "welcome" }} />
          )}

          <Link
            className="absolute top-2 right-2"
            href={url}
            target="_blank"
            passHref
          >
            <ExternalLink className="w-8 h-8 bg-gray-100 p-0.5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 rounded" />
          </Link>
          <div className="py-2 pl-4 pr-2 flex flex-col justify-start md:w-1/2">
            <h5 className="text-gray-900 text-xl font-medium mb-2 capitalize">
              {title || splitUrl(url)}
            </h5>
            <p className="text-gray-700 text-base my-4 h-28">
              {(metaTags?.description &&
                metaTags?.description?.substring(0, 80)) ||
                metaTags?.title?.substring(0, 80)}
              ...
            </p>
            <button
              disabled={loading}
              onClick={() => handleDelete(id)}
              className="flex items-center justify-center bg-gray-100 p-1 rounded-full w-max"
            >
              {loading ? (
                <Loader2 className="w-7 h-7 text-red-500 animate-spin" />
              ) : (
                <Trash2 className="w-7 h-7 text-red-500 hover:scale-110 transition duration-300 " />
              )}
            </button>
            <div className="absolute bottom-2 right-2">
              <div className="flex items-center justify-center bg-gray-100 p-0.5 rounded-full w-max">
                <CalendarDays className="w-4 h-4 mr-1" />
                <p className="text-gray-600 text-xs">
                  {dateFormat(created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Card);
