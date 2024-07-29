// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from "../assets/logo.png";
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
export default function header() {
  return (
    <header>
     <Sidebar/> 
    <nav className="bg-white shadow-md rounded-2xl px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-start mx-20 max-w-screen-xl">
        <a href="#" className="flex items-start">
          <img src={Logo} className="ml-0 h-6 sm:h-16" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center lg:order-2">
          
          
        </div>
        <div className="absolute top-3 right-6 mt-4 mr-4 flex items-center">
          <div className="pr-2">
            <Link to='/'>
            <CiLogout size={24} />
            </Link>
          </div>
          <button className="text-black">Logout</button>
        </div>
      </div>
    </nav>
  </header>
  )
}
