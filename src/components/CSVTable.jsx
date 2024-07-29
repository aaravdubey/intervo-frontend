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
          const csvContent = atob(batch.csvFile);
          const cleanedCSVContent = csvContent.charCodeAt(0) === 0xFEFF ? csvContent.slice(1) : csvContent;
          Papa.parse(cleanedCSVContent, {
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
          setError("Error decoding CSV file");
          setLoading(false);
          toast.error("Error decoding CSV file");
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
      {/* <button
        onClick={handleAutomate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Automate Email Sending
      </button> */}

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



// import Footer from "../components/footer";
// import Header from "../components/header";
// import { FaVideo } from "react-icons/fa";
// import { IoCopy } from "react-icons/io5";
// import { useNavigate } from "react-router";
// import InterviewImg from "../assets/interview.png";


// export default function InterviewPage() {
//   const navigate = useNavigate();

//   return <>
//     <Header />
//     <div className="px-4 lg:px-28 mt-10 mb-16 text-gray-700">
//       <h1 className="text-4xl font-semibold">TCS Python Developers Recruitment 2024</h1>
//       <p className="my-4 text-gray-500">We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters. We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters.</p>
//       <div className="flex gap-3">
//         <span className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">react</span>
//         <span className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">javascript</span>
//       </div>
//       <div>
//         <p className="text-xl font-semibold mt-14">Interview Meeting(s)</p>
//         <div className="flex gap-12">
//           <div className="mt-2 text-sm text-gray-600 flex items-center gap-5 border p-4 rounded-lg leading-6">
//             <img src={InterviewImg} alt="Interview" className="w-20 h-20" />
//             <div className="flex flex-col">
//               <span className="text-teal-blue font-semibold text-lg">Meeting 1</span>
//               <span>14 candidates</span>
//               <span>12/12/2024</span>
//               <span>05:00 pm - 07:00 pm</span>
//             </div>
//           </div>
//           <div className="mt-2 text-sm text-gray-600 flex items-center gap-5 border p-4 rounded-lg leading-6">
//             <img src={InterviewImg} alt="Interview" className="w-20 h-20" />
//             <div className="flex flex-col">
//               <span className="text-teal-blue font-semibold text-lg">Meeting 2</span>
//               <span>8 candidates</span>
//               <span>12/12/2024</span>
//               <span>05:00 pm - 07:00 pm</span>
//             </div>
//           </div>

//           <div className="flex flex-col justify-evenly">
//             <button className="bg-primary-blue hover:brightness-125 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2" onClick={() => navigate('/meeting')}>
//               <FaVideo className="text-2xl" />
//               <p className="text-xs font-bold">Join Meeting</p>
//             </button>
//             <button className="bg-light-blue hover:bg-blue-50 text-gray-600 px-6 py-2 rounded-full flex items-center gap-2">
//               <IoCopy className="text-2xl" />
//               <p className="text-xs font-bold">Copy Link</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <p className="text-xl mt-14 font-semibold">Candidates (25)</p>

//         <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
//           <table className="text-left w-full">
//             <thead className="bg-slate-100 flex w-full border-b border-gray-300">
//               <tr className="flex w-full ">
//                 <th className="px-3 py-5 w-1/6">Index</th>
//                 <th className="px-3 py-5 w-1/6">Name</th>
//                 <th className="px-3 py-5 w-1/6">Email</th>
//                 <th className="px-3 py-5 w-1/6">Sex</th>
//                 <th className="px-3 py-5 w-1/6">Test Score</th>
//                 <th className="px-3 py-5 w-1/6">Interview Score</th>
//               </tr>
//             </thead>
//             <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-64 bg-slate-50">
//               <tr className="flex w-full border-b border-gray-300">
//                 <td className="px-3 py-5 w-1/6">1</td>
//                 <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">Male</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">pending</td>
//               </tr>
//               <tr className="flex w-full border-b border-gray-300">
//                 <td className="px-3 py-5 w-1/6">2</td>
//                 <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">Male</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">pending</td>
//               </tr>
//               <tr className="flex w-full border-b border-gray-300">
//                 <td className="px-3 py-5 w-1/6">3</td>
//                 <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">Male</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">pending</td>
//               </tr>
//               <tr className="flex w-full border-b border-gray-300">
//                 <td className="px-3 py-5 w-1/6">4</td>
//                 <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">Male</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">pending</td>
//               </tr>
//               <tr className="flex w-full border-b border-gray-300">
//                 <td className="px-3 py-5 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
//                 <td className="px-3 py-5 pl-5 w-1/6">Male</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">5</td>
//                 <td className="px-3 py-5 pl-7 w-1/6">pending</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//     <Footer />
//   </>
// }