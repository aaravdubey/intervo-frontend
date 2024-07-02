import React from 'react';

const WebcamPermission = ({ onAllow, onBlock }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
      
        <div className="border-t border-gray-200 pt-4">
          <div className="text-gray-700 mb-2">Requesting Microphone/Webcam permission</div>
          <div className="flex items-center mb-2">
            <div className="text-green-500 mr-2">✔️</div>
            <div className="text-gray-800">1. System Compatibility</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="text-blue-500 mr-2">🔄</div>
            <div className="text-gray-800">2. Webcam & Audio Permissions</div>
          </div>
          <div className="flex items-center mb-4">
            <div className="text-gray-500 mr-2">3. Screen Share Permission</div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default WebcamPermission;
