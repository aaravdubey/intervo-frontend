import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Font, { Text } from 'react-font'


const CSVTable = () => {
  const location = useLocation();
  const { batch } = location.state;
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScores, setShowScores] = useState(false);
  const [scoresData, setScoresData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      if (batch.csvFile) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`http://localhost:3000/api/getCSVFile/${batch.csvFile}`, {
            responseType: 'text',
          });

          Papa.parse(response.data, {
            header: true,
            complete: (result) => {
              // Filter out empty rows
              const filteredData = result.data.filter(row => Object.values(row).some(value => value.trim() !== ""));
              setCsvData(filteredData);
              setLoading(false);
            },
            error: (err) => {
              setError("Error parsing CSV file");
              setLoading(false);
              toast.error("Error parsing CSV file");
            },
          });
          
        } catch (err) {
          setError("Error fetching CSV file");
          setLoading(false);
          toast.error("Error fetching CSV file");
        }
      }
    };

    fetchCSVData();
  }, [batch.csvFile]);

  const handleAutomate = async () => {
    try {
      await axios.post("http://localhost:3000/api/storeCandidates", {
        candidates: csvData,
        companyName: batch.companyName,
        batchId: batch.batchId,
      });
      toast.success("Candidates stored and emails sent successfully");
    } catch (error) {
      toast.error("Error storing candidates and sending emails");
    }
  };

  const handleViewScores = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getScores/${batch.batchId}`);
      setScoresData(response.data);
      navigate('/batchDetails', { state: { batch, scoresData: response.data } }); // Navigate to BatchDetails with state
    } catch (error) {
      toast.error("Error fetching candidate scores");
    }
  };

  if (loading) {
    return <p>Loading CSV data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="px-4 lg:px-28 my-10 text-gray-700">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center my-8">
        {batch.companyName}   {batch.domains} Interview Batch Details Recruitment 2024
      </h2>
      {batch.note && (
        <p className="mb-1 font-normal text-lg text-gray-700">Note: {batch.note}</p>
      )}
      <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
        <table className="text-left w-full">
          <thead className="bg-slate-100 flex w-full border-b border-gray-300">
            <tr className="flex w-full">
              <th className="px-3 py-5 w-1/12 font-semibold">Sr No</th>
              <th className="px-3 py-5 w-2/6 font-semibold">Email</th>
              <th className="px-3 py-5 w-2/6 font-semibold">Name</th>
              <th className="px-3 py-5 w-1/6 font-semibold">Company Name</th>
              <th className="px-3 py-5 w-1/6 font-semibold">Experience</th>
              <th className="px-3 py-5 w-1/6 font-semibold">Domain</th>
              <th className="px-3 py-5 w-1/6 font-semibold">Sex</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-80 overflow-y-scroll w-full bg-slate-50">
          <table className="text-left w-full">
            <tbody className="bg-grey-light items-center justify-between w-full">
              {csvData.map((row, index) => (
                <tr key={index} className="flex w-full border-b border-gray-300 h-min">
                  <td className="px-3 py-5 w-1/12 ">{index + 1}</td>
                  <td className="px-3 py-5 w-2/6 break-words"><Font family='Roboto'>{row.email} </Font></td>
                  <td className="px-3 py-5 w-2/6 break-words ">{row.name}</td>
                  <td className="px-3 py-5 w-1/6 ">{row.companyname}</td>
                  <td className="px-3 py-5 w-1/6 ">{row.experience}</td>
                  <td className="px-3 py-5 w-1/6 ">{row.domain}</td>
                  <td className="px-3 py-5 w-1/6 ">{row.sex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleAutomate}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Automate Email Sending
        </button>
        <button
          onClick={handleViewScores}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          View Candidate Scores
        </button>
      </div >
      <div>
      </div>
    </div>
  );
};

export default CSVTable;
