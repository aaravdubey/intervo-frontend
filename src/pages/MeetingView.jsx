import { useState, useEffect, useRef } from "react";
import Controls from "../components/Controls";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "../components/ParticipantView";
import Loader from "../components/loader";
import Cookies from 'js-cookie';
import axios from "axios";
import { MdAccessTime } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [isRate, setIsRate] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  const [schedule, setSchedule] = useState({});
  const [currentEmail, setCurrentEmail] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const hasJoinedRef = useRef(false);

  const [techSkill, setTechSkill] = useState(0);
  const [softSkill, seSoftSkill] = useState(0);
  const [culturalFit, setCulturalFit] = useState(0);
  const [analyticalSkill, setAnalyticalSkill] = useState(0);
  const [note, setNote] = useState('');

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    if (joined !== "JOINING" && joined !== "JOINED") {
      setJoined("JOINING");
      console.log("Joining the meeting");
      join();
    }
  };

  const getSchedule = async () => {
    const response = await axios.post(`http://localhost:3000/batches/get-batch`, { batchId: Cookies.get('batchId'), email: Cookies.get('email') });
    const parsedSchedule = JSON.parse(response.data.schedule);
    setSchedule(parsedSchedule);
  }

  useEffect(() => {
    getSchedule();
    if (props.meetingId && !hasJoinedRef.current) {
      console.log(props.meetingId);
      joinMeeting();
      hasJoinedRef.current = true;
    }

    Cookies.set("inMeeting", true);

    return () => {
      Cookies.set("inMeeting", false);
    }
  }, [props.meetingId]);

  const saveRatings = async (e) => {
    e.preventDefault();

    const response = await axios.post(`http://localhost:3000/batches/save-ratings`, {
      batchId: Cookies.get('batchId'),
      email: currentEmail,
      techSkill,
      softSkill,
      culturalFit,
      analyticalSkill,
      note
    });
    console.log(response.data);

    if (response.status === 200) {
      toast("Candidate Evaluations Saved", { type: 'success' });
      setTechSkill(0);
      seSoftSkill(0);
      setCulturalFit(0);
      setAnalyticalSkill(0);
      setNote('');
    }
  }

  useEffect(() => {
    const checkCurrentEmail = async () => {
      const currentTime = new Date();

      for (let day in schedule) {
        for (let participant of schedule[day]) {
          const participantTime = new Date(participant.time);
          const endTime = new Date(participantTime.getTime() + 20 * 60000);

          if (currentTime >= participantTime && currentTime <= endTime) {
            // await saveRatings();
            setCurrentEmail(participant.email);

            const timeDiff = endTime - currentTime; // Time difference in milliseconds
            const secondsLeft = Math.floor(timeDiff / 1000); // Convert to seconds
            setCountdown(secondsLeft);

            if (secondsLeft <= 0) {
              await saveRatings(); // Trigger saveRatings when time is up
              // setCountdown(null); // Clear countdown
            }

            return;
          }
        }
      }

      setCurrentEmail(null);
      setCountdown(null);
    };

    checkCurrentEmail();
    const intervalId = setInterval(checkCurrentEmail, 1000); // Check every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId, timerId);
    }
  }, [schedule]);

  const formatTime = (seconds) => {
    if (seconds == null) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="container bg-gray-950 min-w-full h-screen overflow-hidden">
      <ToastContainer position="bottom-right" />
      {joined && joined === "JOINED" ? (
        <div className="h-full flex flex-col box-border">
          <div className="relative flex-grow flex items-center">
            <div className="h-full flex-grow flex  justify-center items-center transition-all duration-500 overflow-hidden p-5 gap-5">
              {/* {console.log(participants)} */}
              {[...participants.keys()].map((participantId, index) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                  count={participants.size}
                />
              ))}
            </div>
            {isRate && <div className="bg-white w-1/3 m-2 p-5 rounded-lg text-gray-700 max-h-[85vh] flex flex-col gap-2">
              <div className="w-full flex justify-between">
                <h1 className="text-xl font-medium">Interview Assessment</h1>
                <p className="text-teal-blue text-sm font-medium flex items-center gap-1"><MdAccessTime /> {formatTime(countdown)}</p>
              </div>
              <p className="text-teal-blue text-sm font-medium flex items-center gap-1"> <FaUser /> {currentEmail}</p>
              <div className="flex gap-1">
                <FaInfoCircle className="text-gray-500 text-xs" />
                <p className="text-gray-500 text-[0.65rem]">Rate the candidate before the alloted time ends, evaluations can be updated till the alloted time.</p>
              </div>

              <form onSubmit={saveRatings} className="mt-10 text-xs">
                <div className="h-[45vh] overflow-y-auto pr-2">
                  <label>Technical Skills (<span className="text-teal-blue font-semibold">{techSkill}</span>/5)</label>
                  <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={techSkill} onChange={(e) => setTechSkill(e.target.value)} />

                  <label className="inline-block mt-8">Soft Skills (<span className="text-teal-blue font-semibold">{softSkill}</span>/5)</label>
                  <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={softSkill} onChange={(e) => seSoftSkill(e.target.value)} />

                  <label className="inline-block mt-8">Cultural Fit (<span className="text-teal-blue font-semibold">{culturalFit}</span>/5)</label>
                  <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={culturalFit} onChange={(e) => setCulturalFit(e.target.value)} />

                  <label className="inline-block mt-8">Problem-Solving & Analytical Skills (<span className="text-teal-blue font-semibold">{analyticalSkill}</span>/5)</label>
                  <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={analyticalSkill} onChange={(e) => setAnalyticalSkill(e.target.value)} />

                  <label className="block mt-8">Note</label>
                  <textarea className="w-full rounded-lg mt-2 p-2 bg-gray-200 focus:outline-none resize-none" rows={10} placeholder="Additional Assessment Notes..." value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <button type="submit" className="bg-teal-blue text-white w-full mt-8 p-2 rounded-xl font-semibold text-sm">Save</button>
              </form>
            </div>}
          </div>
          <Controls className="flex-shrink-0" time={currentTime} name={`TCS Python Developers Recruitment 2024`} isRate={isRate} setIsRate={setIsRate} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-50">
          <Loader />
          Joining...
        </div>
      )}
    </div>
  );
}
