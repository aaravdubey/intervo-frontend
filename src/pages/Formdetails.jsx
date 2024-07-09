
import { FaVideo } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router";
import InterviewImg from "../assets/python.png";
import InterviewBatchCard from "../components/InterviewBatchCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InterviewIcon from "../assets/interview-icon.png";


export default function Formdetails() {
  const navigate = useNavigate();
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
  return <>
    
    <div className="px-4 lg:px-28 my-10 text-gray-700">
      <h1 className="text-4xl font-semibold">TCS Python Developers Recruitment 2024</h1>
      <p className="my-4 text-gray-500">We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters. We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters.</p>

      <div className="flex flex-wrap justify-center gap-4 ">
      <h2 className="text-3xl font-bold text-center my-8">Interview Batches</h2>
      <div className="w-full mb-8"></div>
      {interviewBatches.length === 0 && (
        <div className="text-center text-gray-500">No interview batches found.</div>
      )}
      {interviewBatches.map((batch, index) => (
        <div
          key={index}
          className="max-w-xs bg-white hover:bg-light-blue cursor-pointer rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
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
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{batch.companyName}</h5>
            </a>
            <p className="mb-1 font-normal text-sm text-gray-700">Total Candidates Required: {batch.totalCandidatesRequired}</p>
            <p className="mb-1 font-normal text-sm text-gray-700">Domains: {batch.domains}</p>
            <p className="mb-1 font-normal text-sm text-gray-700">Skills: {batch.skills.join(", ")}</p>
            <p className="mb-1 font-normal text-sm text-gray-700">Interview Types: {batch.interviewTypes.join(", ")}</p>
            <p className="mb-1 font-normal text-sm text-gray-700">Deadline: {new Date(batch.deadline).toLocaleDateString()}</p>
            {batch.note && (
              <p className="mb-1 font-normal text-sm text-gray-700">Note: {batch.note}</p>
            )}
            {batch.csvFile && (
              <a
                href={`data:text/csv;base64,${batch.csvFile}`}
                download={`${batch.companyName}_interview_batch.csv`}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-primary-blue rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Download CSV
                <img src={InterviewIcon} className="ml-2 h-6" alt="Interview Icon" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>




     

      <div className="container">
        <p className="text-xl mt-14 font-semibold">Candidates (25)</p>

        <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
            <table className="text-left w-full">
              <thead className="bg-slate-100 w-full border-b border-gray-300">
                <tr className="w-full">
                  <th className="px-3 py-5 w-1/6">Sr No</th>
                  <th className="px-3 py-5 w-1/6">Name</th>
                  <th className="px-3 py-5 w-1/6">Email</th>
                  <th className="px-3 py-5 w-1/6">Sex</th>
                </tr>
              </thead>
              <tbody className="w-full h-64 bg-slate-50 overflow-y-scroll">
                <tr className="w-full border-b border-gray-300">
                  <td className="px-3 py-5 w-1/6">1</td>
                  <td className="px-3 py-5 w-1/6">XYZ</td>
                  <td className="px-3 py-5 w-1/6">xyz@gmail.com</td>
                  <td className="px-3 py-5 w-1/6">Male</td>
                </tr>
                <tr className="w-full border-b border-gray-300">
                  <td className="px-3 py-5 w-1/6">2</td>
                  <td className="px-3 py-5 w-1/6">XYZ</td>
                  <td className="px-3 py-5 w-1/6">xyz@gmail.com</td>
                  <td className="px-3 py-5 w-1/6">Male</td>
                </tr>
                <tr className="w-full border-b border-gray-300">
                  <td className="px-3 py-5 w-1/6">3</td>
                  <td className="px-3 py-5 w-1/6">XYZ</td>
                  <td className="px-3 py-5 w-1/6">xyz@gmail.com</td>
                  <td className="px-3 py-5 w-1/6">Male</td>
                </tr>
                <tr className="w-full border-b border-gray-300">
                  <td className="px-3 py-5 w-1/6">4</td>
                  <td className="px-3 py-5 w-1/6">XYZ</td>
                  <td className="px-3 py-5 w-1/6">xyz@gmail.com</td>
                  <td className="px-3 py-5 w-1/6">Male</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    
    </div>
    
  </>
}