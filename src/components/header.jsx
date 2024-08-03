import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Logo from "../assets/logo.png";
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle logout functionality
  const handleLogout = () => {
    // Clear user authentication tokens or session data
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <header>
      <Sidebar />
      <nav className="bg-white shadow-md rounded-2xl px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-start mx-20 max-w-screen-xl">
          <a href="#" className="flex items-start">
            <img src={Logo} className="ml-0 h-6 sm:h-16" alt="Flowbite Logo" />
          </a>
          <div className="flex items-center lg:order-2">
            {/* Additional content if needed */}
          </div>
          <div className="absolute top-3 right-6 mt-4 mr-4 flex items-center">
            <div className="pr-2">
              <Link to="/" onClick={handleLogout}>
                <CiLogout size={24} />
              </Link>
            </div>
            <button className="text-black" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
