import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Interviewer_Home from './pages/Interviewer_Home';
import InterviewPage from './pages/InterviewPage';
import VideoMeet from './pages/VideoMeet';
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import MeetingView from './pages/MeetingView';
import { createMeeting, getToken } from './API.js';
import JoinScreen from './pages/JoinScreen.jsx';

const App = () => {
  const [meetingId, setMeetingId] = useState(null);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const authToken = await getToken();
    
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return (
    <>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "Aarav's Org",
        }}
        token={authToken}
      >
        <BrowserRouter>
          <Routes>
            <Route index path='/login' element={<Login />} />
            <Route index path='*' element={<Interviewer_Home />} />
            <Route index path='/interview' element={<InterviewPage />} />
            <Route index path='/meeting' element={authToken && meetingId ? (
              <MeetingProvider
                config={{
                  meetingId,
                  micEnabled: true,
                  webcamEnabled: true,
                  name: "User X",
                }}
                token={authToken}
              >
                <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
              </MeetingProvider>
            ) : (
              <JoinScreen getMeetingAndToken={getMeetingAndToken} />
            )} />
          </Routes>
        </BrowserRouter>
      </MeetingProvider>
    </>
  );
};

export default App;
