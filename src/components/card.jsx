import InterviewIcon from "../assets/interview-icon.png";
import { IoPersonSharp } from "react-icons/io5";

export default function Card() {
  return (
    <div className="max-w-xs bg-white hover:bg-light-blue cursor-pointer rounded">
      <a href="#">
        <img className="rounded saturate-50" src="https://verpex.com/assets/uploads/images/blog/Python-good-for-machine-learning.webp?v=1681274267" alt="" />
      </a>
      <div className="py-4 px-2">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">TCS Python Developers Recruitment 2024</h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <div className="flex justify-between">

          <span className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">react</span>
          <div className="flex items-center gap-0.5 text-slate-500">
            <IoPersonSharp />
            <span className="text-sm">25</span>
          </div>
        </div>
      </div>

    </div>

  )
}