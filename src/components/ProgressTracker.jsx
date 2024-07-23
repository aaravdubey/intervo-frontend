// ProgressTracker.jsx

import React from 'react';

const ProgressTracker = ({ activeTab }) => {
  const steps = ['registration', 'webcam', 'idCard']; // Define your steps here
  const activeIndex = steps.indexOf(activeTab);

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => (
        <div key={step} className="relative">
          <div
            className={`w-3 h-3 rounded-full ${
              index <= activeIndex
                ? 'bg-blue-500' // Color for completed steps
                : 'bg-gray-300' // Color for incomplete steps
            }`}
          ></div>
          {index < steps.length - 1 && (
            <div
              className={`w-px bg-gray-300 h-full absolute ${
                index < activeIndex ? 'bg-blue-500' : ''
              }`}
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
