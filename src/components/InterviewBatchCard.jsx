import React, { useState, useEffect } from "react";
import axios from "axios";
import InterviewIcon from "../assets/logo.png";

const InterviewBatchCard = () => {
  const [interviewBatches, setInterviewBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="flex flex-wrap justify-center gap-4">
      <h2 className="text-3xl font-bold text-center my-8">Interview Batches</h2>
      <div className="w-full mb-8"></div>
      {interviewBatches.length === 0 && (
        <div className="text-center text-gray-500">No interview batches found.</div>
      )}
      {interviewBatches.map((batch, index) => (
        <div
          key={index}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="px-6 py-4">
            <img
              className="w-full h-32 object-cover mb-4 rounded-md"
              src={InterviewIcon}
              alt="Interview Icon"
            />
            <div className="font-bold text-xl mb-2">{batch.companyName}</div>
            <p className="text-gray-700 text-base mb-2">
              Total Candidates Required: {batch.totalCandidatesRequired}
            </p>
            <p className="text-gray-700 text-base mb-2">Domains: {batch.domains}</p>
            <p className="text-gray-700 text-base mb-2">
              Skills: {batch.skills.join(", ")}
            </p>
            <p className="text-gray-700 text-base mb-2">
              Interview Types: {batch.interviewTypes.join(", ")}
            </p>
            <p className="text-gray-700 text-base mb-2">
              Deadline: {new Date(batch.deadline).toLocaleDateString()}
            </p>
            {batch.note && (
              <p className="text-gray-700 text-base mb-2">
                Note: {batch.note}
              </p>
            )}
            {batch.csvFile && (
              <a
                href={`data:text/csv;base64,${batch.csvFile}`}
                download={`${batch.companyName}_interview_batch.csv`}
                className="inline-block bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Download CSV
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewBatchCard;
