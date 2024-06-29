import React from 'react';
import GaugeComponent from 'react-gauge-component'
const OverallResult = () => {
  return (
    <div className="bg-white  rounded-lg p-6 max-w-2xl">
      <div className="flex items-center mb-4">
        <div className=" bg-teal-blue rounded-lg p-2 mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Overall Result</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">MARKS SCORED</p>
          <p className="font-medium">39.6/60</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">QUESTIONS ATTEMPTED</p>
          <p className="font-medium">1/1</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">PERCENTAGE</p>
          <p className="font-medium">66.00%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">TIME TAKEN</p>
          <p className="font-medium">20 sec 15 min</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">STARTED AT</p>
          <p className="font-medium">Thu, Aug 20, 2020, 2:01 PM</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">ENDED AT</p>
          <p className="font-medium">Thu, Aug 20, 2020, 2:01 PM</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          {/* Placeholder for gauge chart */}
          <GaugeComponent
  type="semicircle"
  arc={{
    colorArray: ['#00FF15', '#FF2121'],
    padding: 0.02,
    subArcs:
      [
        { limit: 40 },
        { limit: 60 },
        { limit: 70 },
        {},
        {},
        {},
        {}
      ]
  }}
  pointer={{type: "blob", animationDelay: 0 }}
  value={50}
/>
        </div>
        <div className="w-1/2 pl-4">
          <p className="text-sm bg-yellow-300 text-gray-600">This is overall score (percentage) inclusive of all the modules and sub-modules.</p>
        </div>
      </div>

      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
        VIEW SUBMITTED ANSWERS
      </button>
    </div>
  );
};

export default OverallResult;