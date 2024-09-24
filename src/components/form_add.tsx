"use client";
import { type FormEvent, useId, useRef, type RefObject, useState } from "react";
import { StateAction } from "../../interfaces/app";
import HOC from "./hoc";
import { useSupabaseClient } from "@/hooks/use-supabase";
import Loader from "./loader";

const FormAdd = HOC(
  ({ setOpen, isOpen }: { setOpen: StateAction<boolean>; isOpen: boolean }) => {
    const urlRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const titleRef: RefObject<HTMLInputElement> =
      useRef<HTMLInputElement>(null);
    const id = useId();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { insertData } = useSupabaseClient();

    const closeDialog = () => {
      setOpen(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const forData = new FormData(e.currentTarget);
      const url = forData.get("url") as string;
      const title = forData.get("title") as string;

      const { error } = await insertData({ title, url });
      setError(error);
      setLoading(false);

      if (urlRef.current && titleRef.current) {
        urlRef.current.value = "";
        titleRef.current.value = "";
      }

      closeDialog();
    };

    return (
      <div className="flex items-center justify-center min-h-screen">
        {isOpen && (
          <div
            className="w-full fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                aria-hidden="true"
                onClick={closeDialog}
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="w-full inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {error && (
                  <h3 className="text-center text-sm font-bold text-red-600 mt-4">
                    {error}
                  </h3>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg font-medium leading-6 text-primary"
                          id={id}
                        >
                          Enter URL
                        </h3>
                        <div className="mt-2">
                          <input
                            ref={urlRef}
                            id={id}
                            name="url"
                            type="url"
                            placeholder="https://example.com"
                            required
                            className="w-full px-3 py-2 text-primary-foreground placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div
                          id={id}
                          className="flex flex-row align-top space-x-1"
                        >
                          <h3 className="text-lg font-medium leading-6 text-primary">
                            Enter Title
                          </h3>
                          <p className="text-xs font-medium text-gray-500">
                            (Optional)
                          </p>
                        </div>
                        <div className="mt-2">
                          <input
                            ref={titleRef}
                            id={id}
                            name="title"
                            type="text"
                            placeholder="Exemple"
                            className="w-full px-3 py-2 text-primary-foreground placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={loading}
                      type="submit"
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 border rounded-md shadow-sm border-green-300 hover:transition duration-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {!loading ? (
                        "Submit"
                      ) : (
                        <Loader isFullScreen={false} dimentions="w-5 h-5" />
                      )}
                    </button>
                    <button
                      disabled={loading}
                      type="button"
                      onClick={closeDialog}
                      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-red-300 rounded-md shadow-sm hover:transition duration-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default FormAdd;
