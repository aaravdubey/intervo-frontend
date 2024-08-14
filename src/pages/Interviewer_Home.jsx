import { useEffect, useState } from "react";
import Card from "../components/card";
import Footer from "../components/footer";
import Header from "../components/header";
import CardScheduled from "../components/cardScheduled";
import Cookies from 'js-cookie';
import axios from "axios";
import { MdSearchOff } from "react-icons/md";



export default function Interviewer_Home() {
  const [isNewInterviews, setIsNewInterviews] = useState(true);
  const [newBatches, setNewBatches] = useState([]);
  const [acceptedBatches, setAcceptedBatches] = useState([]);

  const getNewBatches = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/batches/get-new-batches`, { email: Cookies.get('email') });
      console.log(response.data);
      setNewBatches(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAcceptedBatches = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/batches/get-accepted-batches`, { email: Cookies.get('email') });
      console.log(response.data);
      setAcceptedBatches(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNewBatches();
    getAcceptedBatches();
  }, [])

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
        <ul className="hidden text-sm font-semibold text-center text-gray-500 rounded-xl overflow-hidden sm:flex sm:w-[40rem]">
          <li className="w-full focus-within:z-10">
            <button href="#" className={`inline-block w-full p-4  border-r border-white rounded-s-lg hover:text-gray-700  focus:outline-none ${isNewInterviews ? 'bg-light-blue text-gray-900' : 'bg-gray-100'}`} aria-current="page" onClick={() => setIsNewInterviews(true)}>New Interviews</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button href="#" className={`inline-block w-full p-4 bg-gray-100 border-white hover:text-gray-700  focus:outline-none ${!isNewInterviews ? 'bg-light-blue text-gray-900' : 'bg-gray-100'}`} onClick={() => setIsNewInterviews(false)}>Scheduled Interviews</button>
          </li>
        </ul>
      </div>


      {isNewInterviews ?
        <section className="flex flex-wrap gap-10 px-48 pb-32">
          {newBatches.length > 0 ? newBatches.map((batch, index) => (
            <Card key={index} batch={batch} />
          )) :
            <p className="w-full flex justify-center gap-1 items-center py-32 text-gray-400 text-lg">No relevant new batches found <MdSearchOff className="text-xl" /></p>
          }
        </section>
        :
        <section className="flex flex-wrap gap-10 px-48 pb-32">
          {acceptedBatches.length > 0 ? acceptedBatches.map((batch, index) => (
            <CardScheduled key={index} batch={batch} />
          )) :
            <p className="w-full flex justify-center gap-1 items-center py-32 text-gray-400 text-lg">No accepted batches found <MdSearchOff className="text-xl" /></p>
          }
        </section>}

      <Footer />
    </>
  )
}