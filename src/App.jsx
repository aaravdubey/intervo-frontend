  //App.jsx
  import React, { useState } from 'react';
  import { useEffect } from 'react';
  import './App.css'
  import { BatchCard } from './pages/BatchCard';
  import { BatchForm } from './pages/BatchForm';
import { Home } from './pages/Home';
  import  Login  from './pages/Login';
  import Header1 from './components/header1';
  import ManageProfile from './components/ManageProfile';
  import Formdetails from './pages/Formdetails';
  import CSVTable from "./components/CSVTable";
  import Aptitudexam from "./pages/Aptitudexam"



  import{
    BrowserRouter as Router,
    Routes,
    Route,
  
  } from "react-router-dom"
import Interviewer_Home from './pages/Interviewer_Home';
import Logins from './pages/Logins';
import Dashboard from './components/Dashboard';




  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      // Check if the user is authenticated on mount
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return (
      <Router>
        <div>
        
          <Header1 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <Routes>
          {/* <Route exact path="/userhome" element={<Interviewer_Home/>} />
        <Route exact path="/logins" element={<Logins />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/formdetails" element={<Formdetails />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/csv-table" element={<CSVTable />} />
            <Route exact path="/aptiexam" element={<Aptitudexam />} />
            <Route path="/form" element={isAuthenticated ? <BatchForm /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/card" element={isAuthenticated ? <BatchCard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/profile" element={isAuthenticated ? <ManageProfile /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </div>
      </Router>
    );
  }
 
  
  export default App;




 

