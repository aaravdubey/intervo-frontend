import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import axios from 'axios';
import { IoIosPerson } from "react-icons/io";
import {jwtDecode} from 'jwt-decode'; // Fix the import
import Cookies from 'js-cookie';

const API_BASE = 'http://localhost:3000';

export default function InterviewDetails() {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          console.log("Decoded email:", email);
    
          // Fetch interview details using the email
          const response = await axios.post(`${API_BASE}/candidate/interviewsdetails`, { email });
          const interviewData = response.data;
          
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
        } else {
          console.error("Token not found in localStorage.");
        }
      } catch (error) {
        console.error('Error fetching interview details:', error);
      }
    };

    fetchInterviewDetails();
  }, []);
  
  if (!details) {
    return <div>Loading...</div>;
  }

  const handleStartAptitude = () => {
    // Logic to start the aptitude test goes here
    console.log("Aptitude test started");
  };

  const handleStartOnlineInterview = () => {
    // Logic to start the online interview goes here
    console.log("Online interview started");
  };

  const joinMeeting = () => {
    Cookies.set("batchId", details.batchId);
    navigate("/OnlineInterview")
  }

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 px-4 mb-24 mt-14 py-8">
          <div className="bg-white rounded-lg shadow-xl cursor-pointer hover:shadow-stone-400 max-h-full max-w-xl p-2 mx-auto">
            <h2 className="text-xl font-semibold mb-4 mt-6 p-3 flex items-center">
              <span className="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Scheduled Interview
            </h2>
            <h2 className="text-xl font-semibold mb-4 mt-6 p-3 flex items-center">
              Interviewer
            </h2>
            <div className="flex  mb-7 items-center">
              <div className="rounded-full mx-2">
                <IoIosPerson size={56} />
              </div>
              <div>
                <p className="font-semibold">{details.interviewerName}</p>
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {details.position} [Online Interview]
                </p>
              </div>
            </div>
            <div className="mb-24">
              <p className="text-gray-600 mx-5  flex items-center">
                <span className="text-indigo-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                {details.date}, {details.time} {/* Show formatted date and time */}
              </p>
            </div>

            {/* Buttons for starting aptitude and online interview */}
            <div className="flex justify-around mt-6 mb-4">
              <Link to='/rounds'>
              <button
                
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                Start Aptitude
              </button>
              </Link>
              <button
               onClick={joinMeeting}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Start Online Interview
              </button>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
