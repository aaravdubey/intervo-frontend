import Footer from "../components/footer";
import Header from "../components/header";
import { FaVideo } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoCopy } from "react-icons/io5";


export default function InterviewPage() {
  return <>
    <Header />
    <div className="px-4 lg:px-24 my-10 text-gray-700 ">
      <h1 className="text-2xl font-semibold">TCS Python Developers Recruitment 2024</h1>
      <p className="my-4">We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters. We are an XYZ company, in need of ABC developers. We need our candidates evaluated thororughly based on ABC, LMN and XYZ parameters.</p>


      <div>
        <p className="text-lg font-semibold mt-14">Interview Meeting(s)</p>
        <div className="flex gap-12">
          <div className="mt-2 text-gray-700 flex flex-col border p-4 rounded-lg">
            <span className="text-teal-blue font-semibold">Meeting 1</span>
            <span>candidates - 14</span>
            <span>date - 12/12/2024</span>
            <span>time - 05:00 pm - 07:00 pm</span>
          </div>
          <div className="mt-2 text-gray-700 flex flex-col border p-4 rounded-lg">
            <span className="text-teal-blue font-semibold">Meeting 2</span>
            <span>candidates - 8</span>
            <span>date - 13/12/2024</span>
            <span>time - 05:00 pm - 06:00 pm</span>
          </div>

          <div className="flex flex-col justify-evenly">
            <button className="bg-primary-blue saturate-50 hover:brightness-125 text-white px-6 py-2 rounded flex items-center justify-center gap-2">
              <FaVideo className="text-2xl" />
              <p className="text-xs font-semibold">Join Meeting</p>
            </button>
            <button className="border border-primary-blue saturate-50 hover:bg-gray-100 text-primary-blue px-6 py-2 rounded flex items-center gap-2">
              <IoCopy className="text-2xl" />
              <p className="text-xs font-semibold">Copy Link</p>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="text-lg mt-14 font-semibold">Candidates (25)</p>

        <table className="text-left w-full mt-3 rounded-lg overflow-hidden">
          <thead className="bg-slate-200 flex w-full">
            <tr className="flex w-full">
              <th className="p-3 w-1/6">Index</th>
              <th className="p-3 w-1/6">Name</th>
              <th className="p-3 w-1/6">Email</th>
              <th className="p-3 w-1/6">Sex</th>
              <th className="p-3 w-1/6">Test Score</th>
              <th className="p-3 w-1/6">Interview Score</th>
            </tr>
          </thead>
          <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-48 bg-slate-50">
            <tr className="flex w-full">
              <td className="p-3 w-1/6">1</td>
              <td className="p-3 pl-4 w-1/6">XYZ</td>
              <td className="p-3 pl-5 w-1/6">xyz@gmail.com</td>
              <td className="p-3 pl-5 w-1/6">Male</td>
              <td className="p-3 pl-7 w-1/6">5</td>
              <td className="p-3 pl-7 w-1/6"><IoMdTime className="inline-block" /> pending</td>
            </tr>
            <tr className="flex w-full">
              <td className="p-3 w-1/6">2</td>
              <td className="p-3 pl-4 w-1/6">XYZ</td>
              <td className="p-3 pl-5 w-1/6">xyz@gmail.com</td>
              <td className="p-3 pl-5 w-1/6">Male</td>
              <td className="p-3 pl-7 w-1/6">5</td>
              <td className="p-3 pl-7 w-1/6"><IoMdTime className="inline-block" /> pending</td>
            </tr>
            <tr className="flex w-full">
              <td className="p-3 w-1/6">3</td>
              <td className="p-3 pl-4 w-1/6">XYZ</td>
              <td className="p-3 pl-5 w-1/6">xyz@gmail.com</td>
              <td className="p-3 pl-5 w-1/6">Male</td>
              <td className="p-3 pl-7 w-1/6">5</td>
              <td className="p-3 pl-7 w-1/6"><IoMdTime className="inline-block" /> pending</td>
            </tr>
            <tr className="flex w-full">
              <td className="p-3 w-1/6">4</td>
              <td className="p-3 pl-4 w-1/6">XYZ</td>
              <td className="p-3 pl-5 w-1/6">xyz@gmail.com</td>
              <td className="p-3 pl-5 w-1/6">Male</td>
              <td className="p-3 pl-7 w-1/6">5</td>
              <td className="p-3 pl-7 w-1/6"><IoMdTime className="inline-block" /> pending</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <Footer />
  </>
}