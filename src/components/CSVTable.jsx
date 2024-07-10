import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";

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
          const csvContent = atob(batch.csvFile);
          Papa.parse(csvContent, {
            header: true,
            complete: (result) => {
              setCsvData(result.data);
              setLoading(false);
            },
            error: (err) => {
              setError("Error parsing CSV file");
              setLoading(false);
            },
          });
        } catch (err) {
          setError("Error decoding CSV file");
          setLoading(false);
        }
      }
    };

    fetchCSVData();
  }, [batch.csvFile]);

  const handleAutomate = async () => {
    try {
      const validEmails = csvData
        .filter((row) => row.email && row.email.trim() !== "")
        .map((row) => ({ email: row.email }));
  
      console.log("Valid emails to send:", validEmails); // Log valid emails before sending
  
      if (validEmails.length === 0) {
        console.warn("No valid emails found to send.");
        return; // Exit early if no valid emails found
      }
  
      const response = await axios.post("http://localhost:3000/api/sendEmails", {
        emails: validEmails,
        username: "email", // Use email as username
        companyType: "defaultCompanyType", // Replace with actual logic
        companyName: "defaultCompanyName", // Replace with actual logic,
      });
  
      console.log("Emails sent successfully:", response.data); // Log success message
  
      // Optionally, set success message or update state here
    } catch (error) {
      console.error("Error sending Emails:", error);
      setError("Error sending Emails");
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
      <h2 className="text-3xl font-bold text-center my-8">
        {batch.companyName} Interview Batch Details
      </h2>
      <button
        onClick={handleAutomate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Automate Email Sending
      </button>

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
    </div>
  );
};

export default CSVTable;
