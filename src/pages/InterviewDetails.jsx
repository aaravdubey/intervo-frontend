import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import axios from 'axios';
import { IoIosPerson } from "react-icons/io";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const API_BASE = 'http://localhost:3000';

export default function InterviewDetails() {
  const [details, setDetails] = useState(null);
  const [resultsAvailable, setResultsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          const userId = decodedToken.id;
          console.log("Decoded email:", email);
    
          // Fetch interview details using the email
          const interviewResponse = await axios.post(`${API_BASE}/candidate/interviewsdetails`, { email });
          const interviewData = interviewResponse.data;
          
          // Extract date and time strings
          const dateStr = interviewData.date;
          const timeStr = interviewData.time;

          // Combine date and time strings and create a new Date object without time zone adjustment
          const dateTime = new Date(`${dateStr}T${timeStr.split('T')[1]}`);
          
          // Extract date
          const date = dateTime.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          });

          // Extract and format time
          const time = dateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
    
          // Set interview details
          setDetails({
            batchId: interviewData.batchId,
            date: date,
            time: time,
            interviewerName: interviewData.interviewerName,
            position: interviewData.position,
            type: interviewData.type
          });

          // Check results availability
          const resultResponse = await axios.post(`${API_BASE}/candidate/result-status`, { userId });
          console.log("RESULT",resultResponse)
          setResultsAvailable(resultResponse.data.resultsAvailable);
        }
      } catch (error) {
        console.error('Error fetching interview details or checking results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!details) {
    return <div>No interview details available.</div>;
  }

  const handleStartAptitude = () => {
   navigate('/Rounds')
  };

  const handleStartOnlineInterview = () => {
    navigate('/OnlineInterview')
  };

  const joinMeeting = () => {
    Cookies.set("batchId", details.batchId);
    // Pass the date and time as props using the state object in navigate
    navigate("/OnlineInterview", { state: { date: details.date, time: details.time } });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col max-h-screen">
      <div className="flex-1 px-4 mb-20  mt-14 py-8">
      <div className="bg-white rounded-lg p-11 shadow-2xl cursor-pointer hover:shadow-stone-400 max-h-full max-w-xl  mx-auto">
            <h2 className="text-2xl font-bold mb-4">Scheduled Interview</h2>
            <div className="mb-8">
              <h3 className="text-lg mt-11 font-semibold">Interviewer</h3>
              <div className="flex items-center mt-2">
                <IoIosPerson className="text-3xl mr-2" />
                <div>
                  <p className="font-medium">{details.interviewerName}</p>
                  <p className="text-sm text-gray-600">
                    {details.position} [Online Interview]
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <p className="flex items-center">
                <span className="mr-2">📅</span>
                {details.date}, {details.time}
              </p>
            </div>

            {/* Buttons for starting aptitude and online interview */}
            <div className="flex mt-12 space-x-32">
              <button
                onClick={handleStartAptitude}
                className={`px-4 py-2 bg-blue-500 rounded-lg text-white  hover:bg-blue-600 ${
                  resultsAvailable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={resultsAvailable}
              >
                Start Aptitude
              </button>
              <button
                onClick={handleStartOnlineInterview}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Start Online Interview
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}