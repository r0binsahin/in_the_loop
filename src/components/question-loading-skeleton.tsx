import React from "react";

export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5e9dd] max-w-4xl mx-auto">
      <div className="w-full mx-auto px-4 py-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-10/12 mb-8 pb-4 border-b border-primary flex justify-between animate-pulse"
          >
            <div className="w-3/4">
              <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-400 rounded w-2/3"></div>
            </div>
            <div className="w-1/4 flex justify-end">
              <div className="h-8 w-20 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
