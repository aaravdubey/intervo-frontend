import { useMeeting } from "@videosdk.live/react-sdk";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineCallEnd, MdOutlineRateReview } from "react-icons/md";
import { useState } from "react";

export default function Controls({ time, name, isRate, setIsRate }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleCamera = () => {
    toggleWebcam();
    setIsCameraOn(!isCameraOn);
  }

  const toggleMicrophone = () => {
    toggleMic();
    setIsMicOn(!isMicOn);
  }

  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="flex flex-1 w-1/3 items-center gap-5">
        <p className="text-white pr-5 border-r overflow-hidden whitespace-nowrap text-ellipsis">{name}</p>
        <p className="text-white whitespace-nowrap">{time}</p>
      </div>
      <div className="flex flex-1 justify-center gap-4">
        <button className={isMicOn ? "bg-gray-100 text-primary-blue rounded-full p-2.5 text-xl" : "bg-red-700 text-white rounded-full p-2.5 text-xl"} onClick={toggleMicrophone}>{isMicOn ? <IoMicOutline /> : <IoMicOffOutline />}</button>
        <button className={isCameraOn ? "bg-gray-100 text-primary-blue rounded-full p-2.5 text-xl" : "bg-red-700 text-white rounded-full p-2.5 text-xl"} onClick={toggleCamera}>{isCameraOn ? <IoVideocamOutline /> : <IoVideocamOffOutline />}</button>
        <buton onClick={() => leave()} className="bg-red-700 cursor-pointer text-white rounded-full p-2.5 text-xl">
          <MdOutlineCallEnd />
        </buton>
      </div>
      <div className="flex flex-1 justify-end">
        <button onClick={() => setIsRate(!isRate)} className="cursor-pointer text-white rounded-full p-2 text-2xl hover:bg-gray-800">
          <MdOutlineRateReview />
        </button>
      </div>
      {/* <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button> */}
    </div>
  );
}