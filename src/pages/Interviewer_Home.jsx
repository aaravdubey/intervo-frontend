import { useState } from "react";
import Card from "../components/card";
import Footer from "../components/footer";
import Header from "../components/header";


export default function Interviewer_Home() {
  const [isNewInterviews, setIsNewInterviews] = useState(true);

  return (
    <>
      <Header />

      <div className="flex justify-center my-12">
        <div className="sm:hidden max-w-sm">
          <label htmlFor="tabs" className="sr-only">Select your country</label>
          <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option>Profile</option>
            <option>Dashboard</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-xl overflow-hidden sm:flex sm:w-[40rem]">
          <li className="w-full focus-within:z-10">
            <button href="#" className={`inline-block w-full p-4  border-r border-white rounded-s-lg hover:text-gray-700  focus:outline-none ${isNewInterviews ? 'bg-light-blue text-gray-900' : 'bg-gray-100'}`} aria-current="page" onClick={() => setIsNewInterviews(true)}>New Interviews</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button href="#" className={`inline-block w-full p-4 bg-gray-100 border-white hover:text-gray-700  focus:outline-none ${!isNewInterviews ? 'bg-light-blue text-gray-900' : 'bg-gray-100'}`} onClick={() => setIsNewInterviews(false)}>Scheduled Interviews</button>
          </li>
        </ul>
      </div>


      {isNewInterviews ?
        <section className="grid grid-cols-2 md:grid-cols-4 gap-10 px-48 pb-32">
          <Card />
          <Card />
        </section>
        :
        <section className="grid grid-cols-2 md:grid-cols-4 gap-10 px-48 pb-32">
          <Card />
          <Card />
          <Card />
        </section>}

      <Footer />
    </>
  )
}