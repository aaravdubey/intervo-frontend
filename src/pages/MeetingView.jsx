import { useState, useEffect, useRef } from "react";
import Controls from "../components/Controls";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "../components/ParticipantView";
import Loader from "../components/loader";
import Cookies from 'js-cookie';

export default function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [isRate, setIsRate] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const hasJoinedRef = useRef(false);

  const [techSkill, setTechSkill] = useState(0);
  const [softSkill, seSoftSkill] = useState(0);

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

  useEffect(() => {
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

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="container bg-gray-950 min-w-full h-screen overflow-hidden">
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
            {isRate && <div className="bg-white w-1/3 m-2 p-5 rounded-lg text-gray-700 overflow-y-auto max-h-[85vh]">
              <h1 className="text-xl mb-1 font-medium">Interview Assessment</h1>
              <p className="text-teal-blue text-sm font-medium">Candidate: Aarav Dubey</p>

              <form className="mt-10 text-xs">
                <label>Technical Skills ({techSkill}/5)</label>
                <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={techSkill} onChange={(e) => setTechSkill(e.target.value)} />

                <label className="inline-block mt-8">Soft Skills ({softSkill}/5)</label>
                <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={softSkill} onChange={(e) => seSoftSkill(e.target.value)} />

                <label className="inline-block mt-8">Cultural Fit ({softSkill}/5)</label>
                <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={softSkill} onChange={(e) => seSoftSkill(e.target.value)} />

                <label className="inline-block mt-8">Problem-Solving & Analytical Skills ({softSkill}/5)</label>
                <input type="range" min="0" max="5" className="block w-full mt-3 bg-gray-200 appearance-none rounded h-2 transition-all duration-700 ease-in-out" value={softSkill} onChange={(e) => seSoftSkill(e.target.value)} />

                <label className="block mt-8">Note</label>
                <textarea className="w-full rounded-lg mt-2 p-2 bg-gray-200 focus:outline-none resize-none" rows={10} placeholder="Additional Assessment Notes..." />

                <button type="submit" className="bg-teal-blue text-white w-full mt-5 p-2 rounded-full font-semibold text-sm">Save</button>
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
