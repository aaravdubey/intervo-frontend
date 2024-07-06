  //App.jsx
  import React, { useState } from 'react';
  import { useEffect } from 'react';
  import './App.css'
  import { BatchCard } from './Pages/BatchCard';
  import { BatchForm } from './Pages/BatchForm';
import { Home } from './Pages/Home';
  import  Login  from './Pages/Login';
  import Header1 from './components/header1';
  import ManageProfile from './components/ManageProfile';
  import Formdetails from './Pages/Formdetails';



  import{
    BrowserRouter as Router,
    Routes,
    Route,
  
  } from "react-router-dom"




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
            <Route exact path="/" element={<Home />} />
            <Route exact path="/formdetails" element={<Formdetails />} />
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




 

