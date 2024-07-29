import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Login from './Authentication/Login';

import ScheduledInterview from './Pages/ScheduledInterview';
import Rounds from './Pages/Rounds';

import OnlineInterview from './Pages/OnlineInterview';
import ResultsAndFeedBack from './Pages/ResultsAndFeedBack';

import DisplayDetails from './components/DisplayDetails';
import UserValidation from './components/UserValidation';
import MonitoredSessionDialog from './components/MonitoredSessionDialog';
import TestPage from './Pages/TestPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>

      <Route path="/" element={<Login/>} />

      <Route path="/home" element={<ScheduledInterview />} />
      <Route path="/Rounds" element={<Rounds />} />

      <Route path="/Validate" element={<UserValidation/>} />
      <Route path="/OnlineInterview" element={<OnlineInterview/>} />
      <Route path="/displaydetails" element={<DisplayDetails/>} />
      <Route path="/monitor" element={<MonitoredSessionDialog/>} />
      <Route path="/test" element={<TestPage/>} />
      <Route path="/ResultsAndFeedback" element={<ResultsAndFeedBack />} />
    </Routes>
  </Router>
  )
}

export default App
