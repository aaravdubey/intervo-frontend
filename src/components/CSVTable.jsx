import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CSVTable = () => {
  const location = useLocation();
  const { batch } = location.state;
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSVData = async () => {
      if (batch.csvFile) {
        setLoading(true);
        setError(null);
        try {
          // Fetch CSV file content
          const response = await axios.get(`http://localhost:3000/api/getCSVFile/${batch.csvFile}`, {
            responseType: 'text',
          });

          // Parse CSV data
          Papa.parse(response.data, {
            header: true,
            complete: (result) => {
              setCsvData(result.data);
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
      });
      toast.success("Candidates stored and emails sent successfully");
    } catch (error) {
      toast.error("Error storing candidates and sending emails");
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
        {batch.companyName} Interview Batch Details Recruitment 2024
      </h2>
      {batch.note && (
        <p className="mb-1 font-normal text-sm text-gray-700">Note: {batch.note}</p>
      )}
  
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((key) => (
                <th className="border px-4 py-2" key={key}>
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td className="border px-4 py-2" key={i}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAutomate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Automate Email Sending
      </button>
    </div>
  );
};

export default CSVTable;
