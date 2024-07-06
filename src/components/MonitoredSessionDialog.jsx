import React from 'react';

const MonitoredSessionDialog = ({ onProceed, onCancel }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Monitored Session</h2>
        
        <p className="mb-4">Mettl will monitor your session for review</p>
        
        <p className="mb-4">
          Please note that by proceeding to participate and/or complete this
          session you consent to be monitored via video/screen feed. This
          monitoring is being undertaken to eliminate any use of unfair
          means during conduct of this session.
        </p>
        
        <p className="mb-6">
          The said video/screen feed can be viewed whether on a real basis
          and/or accessed subsequently by an authorised person only.
        </p>
        
        <div className="flex justify-between items-center">
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

        <div className="absolute top-8 right-8">
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MonitoredSessionDialog;