import React, { useState } from 'react';
import InterviewCard from '../components/card.jsx';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { Link } from 'react-router-dom';

export default function ScheduledInterview() {
  const [details, setDetails] = useState(null);

  // Example interview data
  const interviews = [
    {
      id: 1,
      title: 'Software Developer',
      description: 'Valid Till: 10-24-2024',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      description: 'Valid Till: 10-24-2024',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s',
    },
    {
      id: 3,
      title: 'Backend Developer',
      description: 'Valid Till: 10-24-2024',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s',
    },
  ];

  const handleStartClick = () => {
    const card1Details = {
      id: 1,
      testTime: '2024-07-01 10:00 AM',
      interviewTime: '2024-07-02 02:00 PM',
      status: 'Pending',
      score: null,
      interviewer: 'John Doe',
    };
    setDetails(card1Details);
  };

  const closeDetailsModal = () => {
    setDetails(null);
  };

  return (
    <>
      <Header />
      <div className="container mb-24 mt-8">
        <div className="flex space-x-24 overflow-x-auto">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} onStartClick={handleStartClick} />
          ))}
        </div>
      </div>
      {details && (
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
            <h2 className="text-xl font-bold mb-4">Details for Interview</h2>
            <p><strong>Test Time:</strong> {details.testTime}</p>
            <p><strong>Interview Time:</strong> {details.interviewTime}</p>
            <p><strong>Status:</strong> {details.status}</p>
            <p><strong>Score:</strong> {details.score !== null ? details.score : 'N/A'}</p>
            <p><strong>Interviewer:</strong> {details.interviewer}</p>
            <div className="mt-4">
              <Link to='/rounds'>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2" >
                Schedule Aptitude
              </button>
              </Link>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Interview scheduled')}>
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
