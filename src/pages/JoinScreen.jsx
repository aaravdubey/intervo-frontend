import { useEffect } from "react";
import { useState } from "react";
import { useMediaDevice } from "@videosdk.live/react-sdk";
import Header from "../components/header";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";
import { useRef } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { MdError } from "react-icons/md";


export default function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const { checkPermissions, requestPermission, getCameras, getMicrophones, getPlaybackDevices } = useMediaDevice();

  const onClick = async () => {
    if (Cookies.get("inMeeting") == "true") {
      return;
    }
    const response = await axios.post('http://localhost:3000/meeting/getMeetingId', {
      batchId: Cookies.get('batchId'),
      token: Cookies.get('token')
    });
    // setMeetingId(response.data.meetingId);
    // await getMeetingId();
    console.log(response.data.meetingId);
    await getMeetingAndToken(response.data.meetingId);
  };

  const requestAudioVideoPermission = async () => {
    try {
      const checkAudioVideoPermission = await checkPermissions("audio_video");
      let requestAudioVideoPermission;
      if (checkAudioVideoPermission) {
        requestAudioVideoPermission = await requestPermission("audio_video");
        let webcams = await getCameras();
        let mics = await getMicrophones();
        let speakers = await getPlaybackDevices();
      }
      return requestAudioVideoPermission.get('audio_video');
    } catch (ex) {
      console.log("Error in requestPermission ", ex);
    }
  };

  const toggleCamera = async () => {
    if (requestAudioVideoPermission && isCameraOn == false) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  }

  const toggleMic = async () => {
    if (requestAudioVideoPermission && isMicOn == false) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
        setIsMicOn(true);

        const updateMicLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          setMicLevel(average);
          requestAnimationFrame(updateMicLevel);
        };

        updateMicLevel();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setMicLevel(0);
      setIsMicOn(false);
    }
  }

  const getMeetingId = async () => {
    try {
      const response = await axios.post('http://localhost:3000/meeting/getMeetingId', {
        batchId: Cookies.get('batchId'),
        token: Cookies.get('token')
      });
      setMeetingId(response.data.meetingId);
      console.log(response.data.meetingId);
      console.log(response);

    } catch (error) {
      if (error.response.status == 404) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    requestAudioVideoPermission();
  }, []);

  return (
    <div className="flex flex-col h-svh">
      <Header />
      {/* <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      /> */}

      <div className="w-full h-full flex items-center justify-center gap-14 px-28">
        <div className="relative w-3/5 h-[70%]">
          <video ref={videoRef} className="w-full h-full bg-gray-900 rounded-lg object-cover" autoPlay muted />

          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl">Camera is off</p>
            </div>
          )}
          <div className="absolute inset-0 flex items-end justify-center gap-3 mb-3">
            <button className={isMicOn ? "bg-white text-primary-blue rounded-full p-5 text-2xl" : "bg-primary-blue text-white rounded-full p-5 text-2xl"} onClick={toggleMic}>{isMicOn ? <IoMicOutline /> : <IoMicOffOutline />}</button>
            <button className={isCameraOn ? "bg-white text-primary-blue rounded-full p-5 text-2xl" : "bg-primary-blue text-white rounded-full p-5 text-2xl"} onClick={toggleCamera}>{isCameraOn ? <IoVideocamOutline /> : <IoVideocamOffOutline />}</button>
            <div className="absolute start-0 flex justify-start items-center gap-2 mb-2 ml-5 bg-white rounded-full p-1">
              <IoMicOutline className={isMicOn ? "text-primary-blue" : "text-gray-400"} />
              <div className="min-w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-blue rounded-full"
                  style={{ width: `${micLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/5">
          <p className="text-xl font-semibold mb-5">TCS Python Developers Recruitment 2024 Interview</p>
          <button onClick={onClick} className={`${Cookies.get("inMeeting") == "true" ? "pointer-events-none bg-gray-500 cursor-none " : ""} block bg-primary-blue text-white w-full p-2 rounded-lg font-semibold`}>Join</button>
          {Cookies.get("inMeeting") == "true" && <p className="mt-2 flex items-center gap-1 text-sm text-red-800"><MdError className="text-base" />Already in meeting!</p>}
        </div>
      </div>
    </div>
  );
}