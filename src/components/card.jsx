import { useNavigate } from "react-router";
import InterviewIcon from "../assets/interview-icon.png";
import { IoPersonSharp } from "react-icons/io5";
import Cookies from 'js-cookie';

export default function Card({ batch }) {
  const navigate = useNavigate();

  const handleClick = () => {
    Cookies.set('batchId', batch.batchId);
    navigate('/new-interview');
  }

  return (
    <div onClick={handleClick} className="max-w-xs overflow-hidden text-ellipsis bg-white hover:bg-light-blue cursor-pointer rounded h-min">
      <a href="">
        <img className="rounded saturate-50" src="https://verpex.com/assets/uploads/images/blog/Python-good-for-machine-learning.webp?v=1681274267" alt="" />
      </a>
      <div className="flex flex-col py-4 px-2">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{batch.domains} Recruitment</h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-700">{batch.note.length <= 80 ? batch.note : batch.note.slice(0, 80) + '...'}</p>
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