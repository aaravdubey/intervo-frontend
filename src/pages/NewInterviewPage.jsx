import Footer from "../components/footer";
import Header from "../components/header";
import { FaVideo } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router";
import InterviewImg from "../assets/interview.png";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../components/modal";
import { useState } from "react";




export default function NewInterviewPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <>
    <Header />
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={""}
      text={""}
      confirmText={""}
      cancelText={""}
      onConfirm={() => { }}
      onCancel={() => { }}
    />
    <div className="px-4 lg:px-28 mt-10 mb-16 text-gray-700">
      <div className="flex gap-16">
        <div>
          <h1 className="text-4xl font-semibold">TCS Python Developers Recruitment 2024</h1>
          <p className="my-4 text-gray-500">We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters. We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters.</p>
          <div className="flex gap-3">
            <span className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">react</span>
            <span className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">javascript</span>
          </div>
        </div>
        <div>
          <button className="bg-primary-blue text-white rounded-full w-full h-12 font-semibold whitespace-nowrap hover:brightness-110" onClick={() => setIsModalOpen(true)}>Confirm Interview</button>
          <p className="text-xs mt-2 text-gray-500">
            <FaInfoCircle className="text-teal-blue inline-block mr-1" />
            Once confirmed, you can't cancel the scheduled interview. So, please confirm only when you are sure of the scheduled dates.
          </p>
        </div>
      </div>


      <div>
        <p className="text-xl font-semibold mt-14">Estimated Interview Meeting(s)</p>
        <div className="flex gap-12">
          <div className="mt-2 text-sm text-gray-600 flex items-center gap-5 border p-4 rounded-lg leading-6">
            <img src={InterviewImg} alt="Interview" className="w-20 h-20" />
            <div className="flex flex-col">
              <span className="text-teal-blue font-semibold text-lg">Meeting 1</span>
              <span>14 candidates</span>
              <span>12/12/2024</span>
              <span>05:00 pm - 07:00 pm</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 flex items-center gap-5 border p-4 rounded-lg leading-6">
            <img src={InterviewImg} alt="Interview" className="w-20 h-20" />
            <div className="flex flex-col">
              <span className="text-teal-blue font-semibold text-lg">Meeting 2</span>
              <span>8 candidates</span>
              <span>12/12/2024</span>
              <span>05:00 pm - 07:00 pm</span>
            </div>
          </div>

        </div>
      </div>

      <div className="container">
        <p className="text-xl mt-14 font-semibold">Candidates (25)</p>

        <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
          <table className="text-left w-full">
            <thead className="bg-slate-100 flex w-full border-b border-gray-300">
              <tr className="flex w-full ">
                <th className="px-3 py-5 w-1/6">Index</th>
                <th className="px-3 py-5 w-1/6">Name</th>
                <th className="px-3 py-5 w-1/6">Email</th>
                <th className="px-3 py-5 w-1/6">Sex</th>
                <th className="px-3 py-5 w-1/6">Test Score</th>
                <th className="px-3 py-5 w-1/6">Interview Score</th>
              </tr>
            </thead>
            <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-64 bg-slate-50">
              <tr className="flex w-full border-b border-gray-300">
                <td className="px-3 py-5 w-1/6">1</td>
                <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
                <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
                <td className="px-3 py-5 pl-5 w-1/6">Male</td>
                <td className="px-3 py-5 pl-7 w-1/6">5</td>
                <td className="px-3 py-5 pl-7 w-1/6">pending</td>
              </tr>
              <tr className="flex w-full border-b border-gray-300">
                <td className="px-3 py-5 w-1/6">2</td>
                <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
                <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
                <td className="px-3 py-5 pl-5 w-1/6">Male</td>
                <td className="px-3 py-5 pl-7 w-1/6">5</td>
                <td className="px-3 py-5 pl-7 w-1/6">pending</td>
              </tr>
              <tr className="flex w-full border-b border-gray-300">
                <td className="px-3 py-5 w-1/6">3</td>
                <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
                <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
                <td className="px-3 py-5 pl-5 w-1/6">Male</td>
                <td className="px-3 py-5 pl-7 w-1/6">5</td>
                <td className="px-3 py-5 pl-7 w-1/6">pending</td>
              </tr>
              <tr className="flex w-full border-b border-gray-300">
                <td className="px-3 py-5 w-1/6">4</td>
                <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
                <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
                <td className="px-3 py-5 pl-5 w-1/6">Male</td>
                <td className="px-3 py-5 pl-7 w-1/6">5</td>
                <td className="px-3 py-5 pl-7 w-1/6">pending</td>
              </tr>
              <tr className="flex w-full border-b border-gray-300">
                <td className="px-3 py-5 w-1/6">5</td>
                <td className="px-3 py-5 pl-4 w-1/6">XYZ</td>
                <td className="px-3 py-5 pl-5 w-1/6">xyz@gmail.com</td>
                <td className="px-3 py-5 pl-5 w-1/6">Male</td>
                <td className="px-3 py-5 pl-7 w-1/6">5</td>
                <td className="px-3 py-5 pl-7 w-1/6">pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <Footer />
  </>
}