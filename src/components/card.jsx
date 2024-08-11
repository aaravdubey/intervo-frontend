// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TfiArrowRight } from 'react-icons/tfi';



const InterviewCard = ({ interview, onStartClick }) => {
  return (
    <div className="p-4 w-1/3 mx-auto border rounded-lg h-full shadow-lg  bg-white">
      <img src={interview.imageUrl} alt={interview.title} className="w-full h-50 object-cover rounded-lg" />
      <h2 className="text-lg text-green-500 font-semibold mt-6">Active</h2>
      <h2 className="text-lg  font-semibold mt-6">{interview.title}</h2>
      <p className="text-sm mt-5">{interview.description}</p>
      <button
        className="flex mt-6  px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
        onClick={onStartClick}
      >
        Start Interview  <TfiArrowRight className="ml-3" size={20} />
      </button>
    </div>
  );
};
export default InterviewCard;

