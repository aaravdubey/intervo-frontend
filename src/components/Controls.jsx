import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";
import { useState } from "react";
import { useEffect} from "react";
import axios from 'axios';
import { useMeeting } from "@videosdk.live/react-sdk";
const API_BASE = 'http://localhost:3000';
export default function Controls({ time, isRate, setIsRate, name }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [interview, setInterview] = useState(null);
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found in local storage');

        const response = await axios.get(`${API_BASE}/candidate/interviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched interviews:', response.data);

        // Assume the first interview in the list is the one to display
        const interviewDetails = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
        setInterview(interviewDetails);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterview(null); // Set to null in case of error
      }
    };

    fetchInterviews();
  }, []);
  const toggleCamera = () => {
    toggleWebcam();
    setIsCameraOn(!isCameraOn);
  };

  const toggleMicrophone = () => {
    toggleMic();
    setIsMicOn(!isMicOn);
  };
  const companyName = interview?.comany || 'Company';
  const jobTitle = interview?.title || 'Job Title';
  const year = new Date().getFullYear(); // Current year
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="flex flex-1 w-1/3 items-center gap-5">
        <p className="text-white pr-5 border-r overflow-hidden whitespace-nowrap text-ellipsis">{`${companyName} ${jobTitle} Recruitment ${year}`}</p>
        <p className="text-white whitespace-nowrap">{time}</p>
      </div>
      <div className="flex flex-1 justify-center gap-4">
        <button
          className={isMicOn ? "bg-gray-100 text-primary-blue rounded-full p-2.5 text-xl" : "bg-red-700 text-white rounded-full p-2.5 text-xl"}
          onClick={toggleMicrophone}
        >
          {isMicOn ? <IoMicOutline /> : <IoMicOffOutline />}
        </button>
        <button
          className={isCameraOn ? "bg-gray-100 text-primary-blue rounded-full p-2.5 text-xl" : "bg-red-700 text-white rounded-full p-2.5 text-xl"}
          onClick={toggleCamera}
        >
          {isCameraOn ? <IoVideocamOutline /> : <IoVideocamOffOutline />}
        </button>
        <button
          onClick={() => leave()}
          className="bg-red-700 cursor-pointer text-white rounded-full p-2.5 text-xl"
        >
          <MdOutlineCallEnd />
        </button>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setIsRate(!isRate)}
          className="cursor-pointer text-white rounded-full p-2 text-2xl hover:bg-gray-800"
        >
          {/* <MdOutlineRateReview /> */}
        </button>
      </div>
    </div>
  );
}
