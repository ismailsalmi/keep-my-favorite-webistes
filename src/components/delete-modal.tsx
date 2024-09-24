import React from "react";
import { StateAction } from "../../interfaces/app";
import HOC from "./hoc";

const DeleteModal = ({
  setShowDeleteModal,
  setOk,
}: {
  setShowDeleteModal: StateAction<boolean>;
  setOk: StateAction<boolean>;
}) => {
  return (
    <div className="fixed mx-2 w-full md:w-1/3 h-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 z-10 overflow-y-auto p-4 bg-white shadow-xl shadow-slate-300 rounded">
      <div className="w-full flex flex-col items-center justify-center h-full">
        <p className="text-xl font-semibold text-gray-600 mb-8">
          Are you sure want to delete?
        </p>
        <div className="w-full flex flex-row items-center justify-between space-x-2">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-red-300 rounded-md shadow-sm hover:transition duration-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
          >
            No
          </button>
          <button
            onClick={() => {
              setOk(true);
              setShowDeleteModal(false);
            }}
            className="w-full px-4 py-2 text-base font-medium text-gray-700 border rounded-md shadow-sm border-green-300 hover:transition duration-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HOC(DeleteModal);
