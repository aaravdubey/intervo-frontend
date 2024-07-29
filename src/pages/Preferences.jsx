import { useNavigate } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Preferences() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [exp, setExp] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [preferences, setPreferences] = useState({});

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
    console.log(selectedDays);
  };

  const addTag = (e) => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  const getPreferences = async () => {
    const response = await axios.post('http://localhost:3000/interviewer/getPreferences', {
      email: Cookies.get('email'),
      token: Cookies.get('token')
    });
    console.log(response.data);
    setPreferences(response.data);
    setEmail(response.data.email);
    setName(response.data.name);
    setExp(response.data.exp);
    setTags(response.data.domains);
    setSelectedDays(response.data.days);
    setToTime(response.data.timeTo);
    setFromTime(response.data.timeFrom);
  }

  const update = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/interviewer/updatePreferences', {
        email: Cookies.get('email'),
        token: Cookies.get('token'),
        domains: tags,
        exp,
        days: selectedDays,
        timeFrom: fromTime,
        timeTo: toTime
      });
      console.log(response.data);
      if (response.status === 200) {
        toast("Preferences updated successfully", { type: 'success' });
      }
    } catch (error) {
      console.log(error);
      toast("Failed to update preferences", { type: 'error' });
    }
  }

  useEffect(() => {
    getPreferences();
  }, []);

  return (
    <div className="text-gray-700">
      <Header />
      <ToastContainer />
      <span className="mb-3 mt-8 text-4xl font-bold px-8 md:px-24 inline-block">Preferences</span>
      <form onSubmit={update} className="w-full justify-center px-8 md:px-24 mb-8">
        <div className="flex w-full gap-16">
          <div className="flex flex-col w-full gap-5">
            <div className="py-2">
              <span className="mb-2 text-md">Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="py-2 flex flex-col">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Domain Expertise</span>
              <div className='flex mt-2'>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-s-md placeholder:font-light placeholder:text-gray-500"
                  name="domains"
                  id="domains"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: React, NodeJs, Python, etc."
                />
                <button type='button' className='bg-teal-blue text-white w-10 rounded-e-md' onClick={addTag}>+</button>
              </div>
            </div>
            <div>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    margin: '0 5px 0 0',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '20px',
                  }}
                >
                  {tag}
                  <span
                    className='ml-2 cursor-pointer text-primary-blue'
                    onClick={() => handleRemoveTag(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-5">
            <div className="py-2 mt-2">
              <span className="mb-2 text-md">Experience (In Months)</span>
              <input
                type="number"
                name="experience"
                id="experience"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 mt-2"
                required
              />
            </div>
            <div className="py-2 mt-2">
              <span className="mb-2 text-md">Day Availibility</span>
              <div className="flex flex-wrap justify-between gap-3 py-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className={`cursor-pointer w-12 text-center py-2.5 rounded-full border ${selectedDays.includes(day) ? 'bg-teal-blue text-white border-lightbg-teal-blue' : 'bg-gray-100 text-black'}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2 mt-2">
              <span className="mb-2 text-md">Time Availibility</span>
              <div className='flex gap-3 mt-2'>
                <div className='flex items-end w-full gap-3'>
                  <span>from</span>
                  <input
                    type="time"
                    name="timeFrom"
                    id="timeFrom"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className='flex items-end w-full gap-3'>
                  <span>to</span>
                  <input
                    type="time"
                    name="timeTo"
                    id="timeTo"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              className="w-full bg-teal-blue text-white p-2.5 rounded-lg mb-6 border mt-5 font-semibold"
              type='submit'
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}
