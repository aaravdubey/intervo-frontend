import { useNavigate } from "react-router";
import Logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoHelpCircleSharp } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";


export default function Header() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const name = Cookies.get('name');
  const email = Cookies.get('email');

  useEffect(() => {
    let token = Cookies.get('token');
    if (!token || token === undefined) navigate("/login");
  }, [])

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('email');
    navigate('/login');
  }

  return (
    <>
      <header>
        <nav className="bg-white border-b border-gray-200 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-10 ">
            <button onClick={() => navigate("/")} className="flex items-center">
              <img src={Logo} className="mr-3 h-6 sm:h-16" alt="Flowbite Logo" />
            </button>
            <div className="flex items-center lg:order-2">
              <button onClick={() => setSidebarVisible(true)} className="flex items-center
            bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-light-blue py-2 px-3  rounded-full">
                <FaUserCircle className="text-2xl text-teal-blue" />
                <span className="hidden lg:block ml-2">{name}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        id='sidebar'
        className={`${sidebarVisible ? 'flex' : 'hidden'} w-full h-full fixed top-0 right-0 transition ease z-40 duration-100 text-gray-800`}
      >
        <div className='flex-1 bg-slate-900 opacity-25' onClick={() => setSidebarVisible(false)}></div>
        <div className='w-[25%] bg-white py-3'>
          <div className='mt-2 border-b border-gray-200 px-2'>
            <div className='flex w-full justify-start items-center'>
              <div className='flex items-center justify-center w-12 m-3 h-12 rounded-full bg-secondary-blue'>
                <FaUserCircle className='align-middle text-5xl text-teal-blue' />
              </div>
              <div className='py-4'>
                <p className='text-xl font-semibold'>Hello, {name}</p>
                <span className='text-xs font-standard text-teal-blue'>{email}</span>
              </div>
            </div>
          </div>
          <div className=''>
            <nav>
              <ul className='flex flex-col items-center px-0.5'>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/preferences")}> <MdEditSquare className='text-xl w-12 text-gray-600' /> Edit Preferences</li>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/")}> <IoIosNotifications className='text-2xl w-12 text-gray-600' /> Upcoming Interviews</li>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/help")}> <IoHelpCircleSharp className='text-2xl w-12 text-gray-600' /> Help  & Support</li>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-red-100 rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={logout}> <BiSolidLogOut className='text-2xl w-12 text-gray-600' /> Log Out</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}