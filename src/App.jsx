import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Interviewer_Home from './pages/Interviewer_Home.jsx';
import InterviewPage from './pages/InterviewPage.jsx';
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import MeetingView from './pages/MeetingView.jsx';
import { createMeeting, getToken } from './API.js';
import JoinScreen from './pages/JoinScreen.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authToken) fetchToken();
  }, [authToken]);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting( authToken ) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default App;
