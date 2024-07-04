import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function DisplayDetails() {
  const location = useLocation();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.details) {
      setDetails(location.state.details);
    }
  }, [location.state]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        {details && (
          <div id="details-modal" className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Details for Interview{details.id}</h2>
              <p><strong>Test Time:</strong> {details.testTime}</p>
              <p><strong>Interview Time:</strong> {details.interviewTime}</p>
              <p><strong>Status:</strong> {details.status}</p>
              <p><strong>Score:</strong> {details.score !== null ? details.score : 'N/A'}</p>
              <p><strong>Interviewer:</strong> {details.interviewer}</p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => alert('Test scheduled')}>
                  Schedule Test
                </button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Interview scheduled')}>
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
