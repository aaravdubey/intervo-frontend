import React from 'react';

const SkeletonLoader = () => (
    <div className="p-4 w-1/3 mx-auto border h-full rounded-lg  bg-white">
  {/* <!-- Image Placeholder --> */}
  <div className="w-full h-64 bg-gray-200 animate-pulse mt-2 rounded-lg"></div>
{/*   
  <!-- Status Placeholder --> */}
  <div className="text-lg w-1/6 text-green-500 font-semibold mt-7 bg-gray-200 h-4 animate-pulse rounded"></div>
  
  {/* <!-- Title Placeholder --> */}
  <div className="text-lg w-1/2 font-semibold mt-6 bg-gray-200 h-6 animate-pulse rounded"></div>
  
  {/* <!-- Description Placeholder --> */}
  <div className="text-sm mt-6 w-1/4 bg-gray-200 h-4 animate-pulse rounded"></div>
{/*   
  <!-- Button Placeholder --> */}
  <div className="flex mt-6 px-4 py-3 w-1/3 bg-gray-200 animate-pulse rounded-xl">
    <div className="flex-grow h-6 bg-gray-200 rounded"></div>
    <div className="ml-3 h-6 w-6 bg-gray-200 rounded-full"></div>
  </div>
</div>

);

export default SkeletonLoader;
