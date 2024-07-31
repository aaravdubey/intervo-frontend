// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterviewCard from '../components/card.jsx';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

export default function ScheduledInterview() {
  const [details, setDetails] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found in local storage');

        const response = await axios.get(`${API_BASE}/candidate/interviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched interviews:', response.data); // Debugging output
        setInterviews(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterviews([]); // Set to empty array in case of error
      }
    };

    fetchInterviews();
  }, []);

  const handleStartClick = (interviewId) => {
    const selectedInterview = interviews.find(interview => interview.id === interviewId);
    setDetails(selectedInterview);
  };

  const closeDetailsModal = () => {
    setDetails(null);
  };

  return (
    <>
      <Header />
      <div className="container  min-h-auto mb-14 mt-11">
        <div className="flex space-x-24 overflow-x-auto">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} onStartClick={() => handleStartClick(interview.id)} />
          ))}
        </div>
      </div>
      {details && (
        <div id="details-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
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
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-12">
                  Start Aptitude
                </button>
              </Link>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Interview scheduled')}>
                Start Interview
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
