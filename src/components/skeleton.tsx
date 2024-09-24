import React from "react";

const Skeleton = ({ count = [1, 2, 3, 4, 5, 6] }: { count?: number[] }) => {
  return (
    <div className="mx-4 lg:mx-10 mt-16">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {count.map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center bg-white rounded-lg overflow-hidden shadow-xl"
          >
            <div className="h-48 w-full bg-yellow-100 animate-pulse" />
            <div className="p-4 w-full">
              <div className="h-5 bg-yellow-100 rounded-md w-3/4 mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-yellow-100 rounded-md w-full animate-pulse" />
                <div className="h-4 bg-yellow-100 rounded-md w-5/6 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
