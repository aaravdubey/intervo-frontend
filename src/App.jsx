import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Login from './Pages/Login';
import DashBoard from './Pages/DashBoard';
import ScheduledInterview from './Pages/ScheduledInterview';
import Rounds from './Pages/Rounds';

import OnlineInterview from './Pages/OnlineInterview';
import ResultsAndFeedBack from './Pages/ResultsAndFeedBack';
import Practice from './Pages/Practice';
import DisplayDetails from './components/DisplayDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>

      <Route path="/" element={<Login/>} />

      <Route path="/home" element={<ScheduledInterview />} />
      <Route path="/Rounds" element={<Rounds />} />
      <Route path="/Practice" element={<Practice />} />
      <Route path="/OnlineInterview" element={<OnlineInterview/>} />
      <Route path="/displaydetails" element={<DisplayDetails/>} />
      <Route path="/ResultsAndFeedback" element={<ResultsAndFeedBack />} />
    </Routes>
  </Router>
  )
}

export default App
