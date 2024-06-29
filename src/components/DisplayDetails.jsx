import React, { useState } from 'react';

export default function DisplayDetails() {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [details, setDetails] = useState(null);
  
    const handleCardClick = (cardDetails) => {
      setDetails(cardDetails);
      setShowDetailsModal(true);
    };
  
    const closeDetailsModal = () => {
      setShowDetailsModal(false);
      setDetails(null);
    };
  
    const sampleData = [
      {
        id: 1,
        testTime: '2024-07-01 10:00 AM',
        interviewTime: '2024-07-02 02:00 PM',
        status: 'Pending',
        score: null,
        interviewer: 'John Doe',
      },
      {
        id: 2,
        testTime: '2024-07-03 11:00 AM',
        interviewTime: '2024-07-04 03:00 PM',
        status: 'Completed',
        score: 85,
        interviewer: 'Jane Smith',
      },
    ];
  
    return (
      <>
    
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleData.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => handleCardClick(card)}
              >
                <h2 className="text-xl font-bold mb-2">Card {card.id}</h2>
                <p>Test Time: {card.testTime}</p>
                <p>Interview Time: {card.interviewTime}</p>
              </div>
            ))}
          </div>
        </div>
        {showDetailsModal && details && (
          <div id="details-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={closeDetailsModal}
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Details for Card {details.id}</h2>
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
       
      </>
    );
  }
