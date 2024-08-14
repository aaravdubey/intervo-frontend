import Footer from "../components/footer";
import Header from "../components/header";
import { FaVideo } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import InterviewImg from "../assets/interview.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [batch, setBatch] = useState({});

  const getBatch = async () => {
    const response = await axios.post(`http://localhost:3000/batches/get-batch`, { batchId: Cookies.get('batchId'), email: Cookies.get('email') });
    response.data.tableData = JSON.parse(response.data.tableData);
    response.data.schedule = JSON.parse(response.data.schedule);
    console.log(response.data);
    setBatch(response.data);
  }

  const notify = () => {
    toast("Interview batch accepted", { type: 'success' });
    // localStorage.setItem('isNotify', true);
  }

  useEffect(() => {
    getBatch();
    // console.log(b);
    if (location.state && localStorage.getItem('isNotify') === 'false') {
      notify();
    }
  }, []);

  return <>
    <ToastContainer />
    <Header />
    <div className="px-4 lg:px-28 mt-10 mb-16 text-gray-700">
      <h1 className="text-4xl font-semibold">{batch.domains} Recruitment</h1>
      <p className="my-4 text-gray-500">{batch.note}</p>
      <div className="flex flex-wrap gap-3">
        {batch.skills?.map((skill, index) => (
          <span key={index} className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">{skill}</span>
        ))}
      </div>
      <div>
        <p className="text-xl font-semibold mt-14">Interview Meeting(s)</p>
        <div className="flex gap-10">
          {batch.schedule && Object.keys(batch.schedule)?.map((day, index) => (
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-5 border p-4 rounded-lg leading-6 bg-slate-50">
              <img src={InterviewImg} alt="Interview" className="w-20 h-20" />
              <div className="flex flex-col">
                <span className="text-teal-blue font-semibold text-lg">Meeting {index + 1}</span>
                <span>{batch.schedule[day].length} candidates</span>
                <span>{batch.schedule[day][0].time.split("T")[0]} ({day})</span>
                <span>{batch.schedule[day][0].time.split("T")[1]} - {batch.schedule[day].at(-1).time.split("T")[1]}</span>
              </div>
            </div>
          ))}

          <div className="flex flex-col justify-evenly">
            <button className="bg-primary-blue hover:brightness-125 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2" onClick={() => navigate('/meeting')}>
              <FaVideo className="text-2xl" />
              <p className="text-xs font-bold">Join Meeting</p>
            </button>
            <button className="bg-light-blue hover:bg-blue-50 text-gray-600 px-6 py-2 rounded-full flex items-center gap-2">
              <IoCopy className="text-2xl" />
              <p className="text-xs font-bold">Copy Link</p>
            </button>
          </div>

        </div>
      </div>

      <div className="container">
        <p className="text-xl mt-14 font-semibold">Candidates ({batch.tableData?.length})</p>

        <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
          <table className="text-left w-full">
            <thead className="bg-slate-100 flex w-full border-b border-gray-300">
              <tr className="flex w-full">
                <th className="px-3 py-5 w-1/6">Index</th>
                <th className="px-3 py-5 w-2/6">Name</th>
                <th className="px-3 py-5 w-2/6">Email</th>
                <th className="px-3 py-5 w-1/6">Sex</th>
                <th className="px-3 py-5 w-1/6">Test Score</th>
                <th className="px-3 py-5 w-1/6">Interview Score</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-80 overflow-y-scroll w-full bg-slate-50">
            <table className="text-left w-full">
              <tbody className="bg-grey-light items-center justify-between w-full">
                {batch.tableData?.map((candidate, index) => (
                  <tr key={index} className="flex w-full border-b border-gray-300 h-min">
                    <td className="px-3 py-5 w-1/6">{index + 1}</td>
                    <td className="px-3 py-5 pl-3 w-2/6">{candidate.name}</td>
                    <td className="px-3 py-5 pl-3 w-2/6">{candidate.email}</td>
                    <td className="px-3 py-5 pl-4 w-1/6">{candidate.sex}</td>
                    <td className="px-3 py-5 pl-5 w-1/6">5</td>
                    <td className="px-3 py-5 pl-4 w-1/6">pending</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </>
}