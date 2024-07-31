import { useState, useEffect, useRef } from "react";
import Controls from "../components/Controls";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "../components/ParticipantView";

import Loader from "../components/loader";
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
              {console.log(participants)}
              {[...participants.keys()].map((participantId, index) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                  count={participants.size}
                />
              ))}
            </div>
          
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