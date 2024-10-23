import React, {  useRef } from 'react';

const StatsComponent = () => {
  const statsRef = useRef(null);



  return (
    <div className=" p-5 my-4">
      <h2 className="text-xl font-bold mb-4 text-center">Statistics Overview</h2>
      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{900}</span>
          </div>
          <span className="mt-2 font-semibold">Total Workers</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-green-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{20}</span>
          </div>
          <span className="mt-2 font-semibold">Total Agencies</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-yellow-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{252}</span>
          </div>
          <span className="mt-2 font-semibold">Total Jobs Available</span>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
