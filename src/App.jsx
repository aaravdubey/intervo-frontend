import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import { createMeeting, getToken } from './API.js';
import Loading from './pages/Loading.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = lazy(() => import('./pages/Login'));
const Interviewer_Home = lazy(() => import('./pages/Interviewer_Home'));
const InterviewPage = lazy(() => import('./pages/InterviewPage'));
const MeetingView = lazy(() => import('./pages/MeetingView'));
const JoinScreen = lazy(() => import('./pages/JoinScreen.jsx'));
const Preferences = lazy(() => import('./pages/Preferences.jsx'));
const NewInterviewPage = lazy(() => import('./pages/NewInterviewPage.jsx'));

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
      }
      finally {
        setLoading(false);
      }
    };

    if (!authToken) fetchToken();
  }, [authToken]);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting(authToken) : id;

    const response = await axios.post('http://localhost:3000/meeting/setMeetingId', {
      batchId: Cookies.get('batchId'),
      meetingId
    });
    setMeetingId(meetingId);
    console.log(response);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  if (loading) {
    return <Loading />;
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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index path='/login' element={<Login />} />
            <Route index path='*' element={<Interviewer_Home />} />
            <Route index path='/new-interview' element={<NewInterviewPage />} />
            <Route index path='/interview' element={<InterviewPage />} />
            <Route index path='/preferences' element={<Preferences />} />
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
        </Suspense>
      </BrowserRouter>
    </MeetingProvider>
  );
};

export default App;