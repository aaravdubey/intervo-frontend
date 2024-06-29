import React, { useState } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { FiEdit3 } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineGrade } from "react-icons/md";
import Logo from '../assets/logo-white.png'
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-0 left-0 z-40 bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 mt-6 ml-2 inline-flex items-center"
      >
            <div className="absolute top-0 text-slate-400 left-2 mt-1 ml-2">
        <svg
          className="w-9 h-1.5 mb-1 block"
          viewBox="0 0 20 1"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="23" height="2" />
        </svg>
        <svg
          className="w-9 h-1.5 mb-1 text-slate-400 block"
          viewBox="0 0 20 1"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="23" height="1" />
        </svg>
        <svg
          className="w-9 h-1.5 block"
          viewBox="0 0 20 1"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="23" height="2" />
        </svg>
        </div>
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-1/5 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? '' : '-translate-x-full'
        } bg-white dark:bg-gray-700`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
       <a href="#" className="flex  mt-2 p-3 items-start">
          <img src={Logo} className="ml-0 h-1/2  sm:h-16" alt="Flowbite Logo" />
        </a>
        <button
          type="button"
          onClick={toggleSidebar}
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          {/* Menu items */}
          <ul className="space-y-4 mt-3 font-medium">
            
            <li>
              <Link to='/home'
                
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
              >
               < GrSchedules/>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link to='/Rounds'
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
              >
               <FiEdit3/>
                <span className="ms-3">Aptitude Test</span>
              </Link>
            </li>
           
            <li>
              <Link to='/OnlineInterview'
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
              >
                <BsPersonLinesFill/>
                <span className="ms-3">Online Interview</span>
              </Link>
            </li>
            <li>
              <Link to='/Practice'
                
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
              >
                <IoMdPaper/>
                
                <span className="ms-3">Practice</span>
              </Link>
            </li>
            <li>
              <Link to='/ResultsAndFeedback'
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
              >
                <MdOutlineGrade/>
                <span className="ms-3">Results and Feedback</span>
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
