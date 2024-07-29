// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaChartPie } from "react-icons/fa";
const SectionPerformance = () => {
  return (
    <div className="bg-white p-6 rounded-lg ">
      <h2 className="text-xl  rounded-md font-semibold mb-4 flex items-center">
        <div className=' bg-teal-blue p-1 rounded-md'>
      <FaChartPie size={30}/>
      </div>
      <div className='pl-3'>
      Section wise Performance Analysis
            </div>
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Section-wise Percentage</h3>
          <p className="text-gray-700 mb-2">SECTION-1</p>
          <p className="text-xl font-bold mb-4">39.6/60 (66.00%)</p>
          <div className="relative h-32 w-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeDasharray="66, 100"
              />
            </svg>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Section-wise Percentile</h3>
          <div className="mt-8">
            <div className="flex items-center mb-2">
              <span className="w-20 text-sm text-gray-600">Section-1</span>
              <div className="flex-1 h-4 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-400 rounded-full" 
                  style={{width: '80%'}}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">80</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPerformance;