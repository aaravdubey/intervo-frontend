import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import CandidateDestailsForm from '../components/CandidateDestailsForm.jsx';
import OverallResult from '../components/OverallResult.jsx';
import TimeAnalysis from '../components/TimeAnalysis.jsx';
import SectionPerformance from '../components/SectionPerformance.jsx';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Note: Use the default import instead of destructuring

const API_BASE = 'http://localhost:3000';

export default function ResultsAndFeedBack() {
  const [resultsAvailable, setResultsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      
      axios.post(`${API_BASE}/candidate/result-status`, { userId })
        .then(response => {
          setResultsAvailable(response.data.resultsAvailable);
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
    return <div>Loading...</div>; // Show a loading message while checking the result status
  }

  return (
    <div className='min-h-screen'>
      <Header />

      <div className="container mx-auto mt-11 mb-28 min-h-80 p-4">
        {resultsAvailable ? (
          <div className="grid grid-cols-1  md:grid-cols-2 mb-4 gap-6">
            {/* Candidate Details */}
            <div className="bg-white w-2/3  cursor-pointer hover:shadow-stone-400 shadow-xl p-4">
              <CandidateDestailsForm />
            </div>

            {/* Overall Result */}
            <div className="bg-white cursor-pointer hover:shadow-stone-400 rounded-lg shadow-xl">
              <OverallResult />
            </div>

            {/* Time Analysis */}
            {/* <div className="bg-white rounded-lg shadow-xl p-4 col-span-2">
              <TimeAnalysis />
            </div> */}

            {/* Section-wise Performance Analysis */}
            {/* <div className="bg-white rounded-lg shadow-xl p-4 col-span-2">
              <SectionPerformance />
            </div> */}
          </div>
        ) : (
          <div className="bg-white p-8 mt-20 rounded-lg">
            <h2 className="text-center text-3xl font-semibold">Results Not Available</h2>
            <p className="text-center mt-4">Please complete your aptitude assesment and then check back later for your results.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
