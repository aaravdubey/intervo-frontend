// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Authentication/Login';
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import { createMeeting, getToken } from './API.js';
import ScheduledInterview from './Pages/ScheduledInterview';
import Rounds from './Pages/Rounds';
import Loading from './Pages/Loading.jsx';
import ResultsAndFeedBack from './Pages/ResultsAndFeedBack';
import axios from 'axios';
import DisplayDetails from './components/DisplayDetails';
import UserValidation from './components/UserValidation';
import MonitoredSessionDialog from './components/MonitoredSessionDialog';
import TestPage from './Pages/TestPage';
import JoinScreen from './Pages/JoinScreen';
import MeetingView from './Pages/MeetingView.jsx';

const API_BASE = 'http://localhost:3000';

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);

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
    const meetingId = id == null ? await createMeeting(authToken) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  const name = interview?.name || 'User X';
  console.log(name)
  if (loading) {
    return <Loading />;
  }

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name,
      }}
      token={authToken}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ScheduledInterview />} />
          <Route path="/Rounds" element={<Rounds />} />
          <Route path="/Validate" element={<UserValidation />} />
          <Route path="/displaydetails" element={<DisplayDetails />} />
          <Route path="/monitor" element={<MonitoredSessionDialog />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="/OnlineInterview"
            element={authToken && meetingId ? (
              <MeetingProvider
                config={{
                  meetingId,
                  micEnabled: true,
                  webcamEnabled: true,
                  name,
                }}
                token={authToken}
              >
                <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
              </MeetingProvider>
            ) : (
              <JoinScreen getMeetingAndToken={getMeetingAndToken} />
            )}
          />
          <Route path="/ResultsAndFeedback" element={<ResultsAndFeedBack />} />
        </Routes>
      </Router>
    </MeetingProvider>
  );
}

export default App;
