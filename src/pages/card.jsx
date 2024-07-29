import React from 'react';
import InterviewIcon from '../assets/interview-icon.png';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { TfiArrowRight } from "react-icons/tfi";


export default function InterviewCard({ interview }) {
  return (
    <>
  <div className="border rounded-xl ml-24 shadow-xl overflow-x-auto w-full">
    <img src={interview.imageUrl} alt={interview.title} className="h-40 w-full object-cover" />
    <div className="p-4">
      <span className=" text-green-500 text-sm font-semibold px-2 py-1 rounded inline-block mb-2">Active</span>
      <h2 className="text-xl font-bold mb-2">{interview.title}</h2>
      <p className="text-gray-600 pt-7 mb-1">{interview.description}</p>
      <div className="flex items-center justify-between text-gray-700 mb-4">
      
      </div>
      <Link to='/displaydetails'>
      <button className="flex items-center justify-center bg-teal-blue hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
        Start  <TfiArrowRight className="ml-3" size={20} />
      </button>
      </Link>
    </div>
  </div>

   </>
  );
}