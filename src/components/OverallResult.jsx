import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GaugeComponent from 'react-gauge-component';
import {jwtDecode} from 'jwt-decode';
import TimeAnalysis from './TimeAnalysis'; // Make sure to import the TimeAnalysis component

const API_BASE = 'http://localhost:3000'; // Replace with your API base URL

const OverallResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      
      axios.post(`${API_BASE}/api/questions/test-results`, { userId })
        .then(response => {
          setResult(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error checking results availability:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!result) {
    return <p>No results available.</p>;
  }

  const {
    marksScored,
    questionsAttempted,
    percentage,
    timeTaken,
    startedAt,
    endedAt,
    correctAnswersCount,
    wrongAnswersCount
  } = result;

  // Convert timeTaken to minutes and seconds
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl">
      <div className="flex items-center mb-4">
        <div className="bg-teal-blue rounded-lg p-2 mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Overall Result</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">MARKS SCORED</p>
          <p className="font-medium">{marksScored}/40</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">QUESTIONS ATTEMPTED</p>
          <p className="font-medium">{questionsAttempted}/20</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">PERCENTAGE</p>
          <p className="font-medium">{percentage.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">TIME TAKEN</p>
          <p className="font-medium">{minutes} min {seconds} sec</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">STARTED AT</p>
          <p className="font-medium">{new Date(startedAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">ENDED AT</p>
          <p className="font-medium">{new Date(endedAt).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <GaugeComponent
            type="semicircle"
            arc={{
              colorArray: ['#00FF15', '#FF2121'],
              padding: 0.02,
              subArcs: [
                { limit: 40 },
                { limit: 60 },
                { limit: 70 },
                {},
                {},
                {},
                {}
              ]
            }}
            pointer={{ type: 'blob', animationDelay: 0 }}
            value={percentage}
          />
        </div>
        <div className="w-1/2 pl-4">
          <p className="text-sm bg-yellow-300 text-gray-600">This is overall score (percentage) inclusive of all the modules and sub-modules.</p>
        </div>
      </div>

      {/* TimeAnalysis component with correct and wrong answers as props */}
      {/* <TimeAnalysis result={result} /> */}
    </div>
  );
};

export default OverallResult;