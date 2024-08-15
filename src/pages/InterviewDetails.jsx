// src/pages/InterviewDetails.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

export default function InterviewDetails() {
  // Mock data for the UI layout
  const details = {
    date: '21 Mar 21',
    time: '14:55 PM - 15:55 PM',
    name: 'Danna Dammann',
    position: 'Senior product designer',
    type: 'Interview'
  };

  return (
    <>
      <Header />
      <div className="flex flex-col  min-h-screen">
        <div className="flex-1 px-4 mt-14 py-8">
          <div className="bg-white rounded-lg shadow-xl cursor-pointer hover:shadow-2xl max-h-full max-w-xl p-2 mx-auto">
            <h2 className="text-xl font-semibold mb-4 mt-11 p-3 flex items-center">
              <span className="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Upcoming events
            </h2>
            <div className="mb-4">
              <p className="text-gray-600 flex items-center">
                <span className="text-indigo-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                {details.date}, {details.time}
              </p>
            </div>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full mr-3" />
              <div>
                <p className="font-semibold">{details.name}</p>
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {details.position} • {details.type}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}