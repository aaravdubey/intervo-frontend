// src/pages/InterviewDetails.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

export default function InterviewDetails() {
  // Mock data for the UI layout
  const details = {
    testTime: '10:00 AM',
    interviewTime: '2:00 PM',
    status: 'Scheduled',
    score: '85',
    interviewer: 'John Doe',
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Details for Interview</h2>
            <p className="text-lg mb-2"><strong>Test Time:</strong> {details.testTime}</p>
            <p className="text-lg mb-2"><strong>Interview Time:</strong> {details.interviewTime}</p>
            <p className="text-lg mb-2"><strong>Status:</strong> {details.status}</p>
            <p className="text-lg mb-2"><strong>Score:</strong> {details.score !== null ? details.score : 'N/A'}</p>
            <p className="text-lg mb-6"><strong>Interviewer:</strong> {details.interviewer}</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Link to='/rounds'>
                <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded mb-4 sm:mb-0">
                  Start Aptitude
                </button>
              </Link>
              <button className="bg-green-500 text-white font-bold py-3 px-6 rounded">
                Start Interview
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
