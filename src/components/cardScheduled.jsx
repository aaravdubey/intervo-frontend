import { useNavigate } from "react-router";
import InterviewIcon from "../assets/interview-icon.png";
import { IoPersonSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import Cookies from 'js-cookie';
import { useEffect } from "react";

export default function CardScheduled({ batch }) {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      console.log(batch);
      Cookies.set('batchId', batch.batchId);
      navigate('/interview');

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(batch);
  }
    , [])

  return (
    <div onClick={handleClick} className="max-w-xs bg-white hover:bg-light-blue cursor-pointer rounded h-fit">
      <a href="">
        <img className="rounded saturate-50" src="https://verpex.com/assets/uploads/images/blog/Python-good-for-machine-learning.webp?v=1681274267" alt="" />
      </a>
      <div className="py-4 px-2">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{batch.domains} Recruitment</h5>
        </a>
        <div className="w-full flex justify-between mb-2 font-normal text-sm text-gray-800">
          <p>Tests</p>
          <SiTicktick className="text-primary-blue" />
        </div>
        <div className="w-full flex justify-between mb-3 font-normal text-sm text-gray-800">
          <p>Interviews</p>
          <p>0/{batch.candidates.length}</p>
        </div>
        <div className="flex justify-between">

          <div className="flex flex-wrap gap-1">
            {batch.skills.map((skill, index) => (
              <span key={index} className="bg-slate-200 rounded-3xl px-2 py-1 text-sm">{skill}</span>
            ))}
          </div>
          <div className="flex items-center gap-0.5 text-slate-500">
            <IoPersonSharp />
            <span className="text-sm">{batch.candidates.length}</span>
          </div>
        </div>
      </div>

    </div>

  )
}