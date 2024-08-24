import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

// Dynamically import the InterviewCard and SkeletonLoader components
const InterviewCard = lazy(() => import('../components/card.jsx'));
const SkeletonLoader = lazy(() => import('../components/SkeletonLoader.jsx'));

export default function ScheduledInterview() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found in local storage');

        // Simulate a network request delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay

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
    navigate(`/interview-details/${interviewId}`);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto min-h-[70vh] mt-11 px-4">
        <div className="flex space-x-4 h-full overflow-x-auto py-4">
          <Suspense fallback={<SkeletonLoader />}>
            {interviews.length === 0 ? (
              <SkeletonLoader />  // Show skeleton loader if no interviews are available
            ) : (
              interviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onStartClick={() => handleStartClick(interview.id)}
                />
              ))
            )}
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
