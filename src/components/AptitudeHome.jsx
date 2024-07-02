import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbPlugConnected } from "react-icons/tb";

export default function AptitudeHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Internet Connectivity",
      content: "Ensure that you have a stable internet connection with a minimum speed of 512 kbps",
      icon: (
       <TbPlugConnected size={60}/>
      ),
    },
    {
      title: "Don't Refresh",
      content: "Don't refresh the webpage during the assessment. This will lead to immediate submission of your responses.",
      icon: (
        <div className="relative">
          <div className="bg-gray-200 rounded-lg p-4 shadow">
            <div className="flex space-x-1 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span className="text-4xl font-bold text-gray-700">F5</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "Auto Save",
      content: "All your responses are saved automatically. In case of disconnection or shutdown, you will still be able to resume easily.",
      icon: (
        <div className="relative">
          <div className="w-24 h-24 bg-gray-700 rounded-sm transform rotate-45"></div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-gray-500 rounded-sm transform rotate-45 translate-x-2 translate-y-2"></div>
          <div className="absolute bottom-0 right-0 w-12 h-6 bg-gray-300 rounded-sm"></div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center  bg-gray-900 text-white min-h-auto">
      <div className="w-1/3 mx-24 mb-24 p-24 ">
        <div className="mb-8 ">
        <h1 className="text-2xl font-semibold mb-4">Hi,</h1>
                    <h2 className="text-3xl font-bold mb-8">Welcome to</h2>
                    <h3 className="text-4xl font-bold mb-12">Sample Test-copy</h3>

                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold">Questions</p>
                            <p>4 Questions</p>
                        </div>
                        <div>
                            <p className="font-semibold">Sections</p>
                            <p>2 Sections</p>
                        </div>
                        <div>
                            <p className="font-semibold">Test Duration</p>
                            <p>60 Minutes</p>
                        </div>
                    </div>
          <Link to="/Validate">
          <button className="mt-4  px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
            Proceed
          </button>
          </Link>
        </div>
      </div>
      <div className="w-2/3 mt-11 mb-24 mr-11 bg-white rounded-lg shadow-lg text-black">
        <div className="relative mt-11">
          <div className="flex justify-between  mb-6 ">
            <button onClick={prevSlide} className="text-gray-400  hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button onClick={nextSlide} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l7-7-7-7"></path>
              </svg>
            </button>
          </div>

          <div className="flex justify-center pb-11 mb-6">
            {slides[currentSlide].icon}
          </div>

          <h2 className="text-2xl font-semibold text-center mb-4">{slides[currentSlide].title}</h2>
          <p className="text-center text-gray-700 mb-8">
            {slides[currentSlide].content}
          </p>

          <div className="flex justify-center pb-11 space-x-2">
            {slides.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
