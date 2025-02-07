import React from "react";

const SkeletonLoader = ({ ProductLoad, Header, Slide }) => {
  return (
    <div className="flex h-auto w-auto">
      {ProductLoad && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50 overflow-hidden"
            >
              <div className="w-full h-40 bg-gray-700/60 rounded-lg animate-pulse mb-4" />
              <div className="h-6 bg-gray-700/60 rounded animate-pulse mb-3 w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700/60 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-700/60 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-700/60 rounded animate-pulse w-4/6" />
              </div>
              <div className="flex gap-3 mt-4">
                <div className="h-8 bg-gray-700/60 rounded-lg animate-pulse w-24" />
                <div className="h-8 bg-gray-700/60 rounded-lg animate-pulse w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {Header && (
        <div className="w-full px-3 h-[70px] bg-gray-800/50">
          <div className="flex justify-between items-center h-full">
            <div className="p-3 bg-gray-800/70 w-10 h-10 rounded-lg animate-pulse"></div>

            <div className="flex-1 hidden min-[1080px]:flex items-center justify-center gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-24 bg-gray-700 rounded-full animate-pulse"
                ></div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {Slide && (
        <div className="w-full my-2 max-w-4xl mx-auto  bg-gray-800/20">
        <div className="w-full rounded h-[150px] sm:h-[200px] p-3">
        <div className="w-full flex items-end justify-center h-full bg-gray-800/70 rounded-lg animate-pulse">
        <div className="w-[100px] p-2 bg-white/10 mb-3 rounded-full">

        </div>
        </div>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
