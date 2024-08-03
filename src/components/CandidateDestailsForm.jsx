// eslint-disable-next-line no-unused-vars
import { useEffect, useState, useRef } from "react";
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export default function CandidateDestailsForm() {
  const [interview, setInterview] = useState(null);
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

        console.log('Fetched interviews:', response.data);

        // Assume the first interview in the list is the one to display
        const interviewDetails = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
        setInterview(interviewDetails);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterview(null); // Set to null in case of error
      }
    };

    fetchInterviews();
  }, []);
  const Name = interview?.name || 'Name';
  const email = interview?.email || 'email@gmail.com';
 
  return (
    <div>
      <div className="bg-white  rounded-lg p-4  max-w-sm">
  <div className="flex items-center mx- mb-4">
  <div className=" bg-teal-blue w- rounded-lg p-2 top-0 mr-3">
      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
    <h2 className="text-xl text-center font-semibold text-gray-700">Candidate Details</h2>
  </div>
  
  <div className="flex justify-center mt-14 mb-4">
    <div className="bg-blue-800 rounded-full p-4">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
  </div>
  <div className='mx-28'>
     
    <p className="text-sm text-center pt-2 text-gray-600">Candidate Name</p>
    <p className="font-medium text-center">{Name}</p>
    
    <p className="text-sm text-center pt-4 text-gray-600">Candidate E-mail Id</p>
    <p className="font-medium mt-2 text-center">{email}</p>
    

  </div>
</div>
    </div>
  )
}
