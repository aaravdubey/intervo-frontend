import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

const CSVTable = () => {
  const location = useLocation();
  const { batch } = location.state;
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    if (batch.csvFile) {
      const csvContent = atob(batch.csvFile);
      Papa.parse(csvContent, {
        header: true,
        complete: (result) => {
          setCsvData(result.data);
        },
      });
    }
  }, [batch.csvFile]);

  return (
    <div className="px-4 lg:px-28 my-10 text-gray-700">
      <h2 className="text-3xl font-bold text-center my-8">
        {batch.companyName} Interview Batch Details
      </h2>
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
