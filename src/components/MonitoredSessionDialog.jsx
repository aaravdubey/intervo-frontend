import React from 'react';
import { FcWebcam } from "react-icons/fc";

const MonitoredSessionDialog = ({ onProceed, onCancel }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-xl p-8 w-1/2 ">
        <div className="flex items-start space-x-24">
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Monitored Session</h2>
            <p className="mb-4 text-justify">Intervo will monitor your session for review</p>
            <p className="mb-4 text-justify">
              Please note that by proceeding to participate and/or complete this
              session you consent to be monitored via video/screen feed. This
              monitoring is being undertaken to eliminate any use of unfair
              means during conduct of this session.
            </p>
            <p className="mb-6 text-justify">
              The said video/screen feed can be viewed whether on a real basis
              and/or accessed subsequently by an authorised person only.
            </p>
          </div>
          <FcWebcam size={310} className="ml-10" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoredSessionDialog;
