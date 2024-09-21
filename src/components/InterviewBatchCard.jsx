import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgProfile} from "react-icons/cg";
import { GrDomain } from "react-icons/gr";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa6";
import InterviewIcon from "../assets/interview-icon.png";

const InterviewBatchCard = () => {
  const [interviewBatches, setInterviewBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewBatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/interviewBatch", {
          headers: {
            Authorization: token
          }
        });
        setInterviewBatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching interview batches:", error);
        setError("Failed to fetch interview batches: " + error.message);
        setLoading(false);
      }
    };

    fetchInterviewBatches();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-10 ">
      <h2 className="text-3xl font-bold text-center my-8">Interview Batches</h2>
      <div className="w-full mb-8"></div>
      {interviewBatches.length === 0 && (
        <div className="text-center text-gray-500">No interview batches found.</div>
      )}
      {interviewBatches.map((batch, index) => (
        <div
          key={index}
          className="max-w-xs  bg-white hover:bg-light-blue cursor-pointer rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <a href="#">
            <img
              className="rounded saturate-50 w-full h-48 object-cover"
              src="https://verpex.com/assets/uploads/images/blog/Python-good-for-machine-learning.webp?v=1681274267"
              alt="Interview Batch"
            />
          </a>
          <div className="py-5 px-2">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{batch.companyName} (Total Candidate {batch.candidates.length})</h5>
            </a>
            <p className="flex items-center mb-1 font-normal text-sm text-gray-700">
  <CgProfile className="mr-2" /> Total Candidates Required: {batch.totalCandidatesRequired}
</p>

            <p className="flex items-center mb-1 font-normal text-sm text-gray-700"><GrDomain className="mr-2" />Domains: {batch.domains}</p>
            <p className="flex flex-col mb-1 font-normal text-sm text-gray-700">
  <span className="flex items-center mb-1">
    <GiSkills className="mr-2" />
    <span>Skills:</span>
  </span>
  <div className="flex flex-wrap gap-1">
    {batch.skills.map((skill, index) => (
      <span key={index} className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">
        {skill}
      </span>
    ))}
  </div>
</p>


            <p className="flex items-center mb-1 font-normal text-sm text-gray-700"><FaLaptopCode className="mr-2"  />Interview Types: {batch.interviewTypes.join(", ")}</p>
            <p className="flex items-center mb-1 font-normal text-sm text-gray-700"><BsFillCalendarDateFill className="mr-2"  />Deadline: {new Date(batch.deadline).toLocaleDateString()}</p>
        
            <button
              onClick={() => navigate("/csv-table", { state: { batch } })}
              className="inline-flex items-center px-4 py-2.5 mt-2 text-sm font-medium text-center text-white bg-blue-600 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              View More Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewBatchCard;
