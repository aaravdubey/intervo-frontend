import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header.jsx'
import Footer from'../components/footer.jsx'
import SideBar from '../components/sideBar.jsx';

const DashBoard = () => {
  const [interviews, setInterviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/interviews', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(res => {
      setInterviews(res.data || []); // Ensure it's an array
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });

    axios.get('/api/notifications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(res => setNotifications(res.data || [])) // Ensure it's an array
    .catch(err => console.error(err));
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <>
      <Header/>
      
    <div className="p-6 min-h-screen">
     
      <h1 className="text-3xl text-center text-gray-800 mb-8">Dashboard</h1>
      <div className="flex justify-between space-x-4">
        <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">Upcoming Interviews</h2>
          {/* <ul>
            {interviews.filter(interview => new Date(interview.rounds[0].scheduledDate) > new Date()).map(interview => (
              <li key={interview._id} className="bg-white mb-4 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-700">{interview.title}</h3>
                <p className="text-gray-600">{interview.description}</p>
                <div className="mt-4">
                  {interview.rounds.map((round, index) => (
                    <div key={index} className={`p-3 border rounded mb-2 ${round.status === 'Pending' ? 'border-yellow-400' : round.status === 'Completed' ? 'border-green-400' : 'border-red-400'}`}>
                      <strong>{round.roundType}:</strong> {round.status}
                      <p>Scheduled Date: {new Date(round.scheduledDate).toLocaleString()}</p>
                      <p>Interviewer: {round.interviewer?.name}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">Notifications</h2>
          {/* <ul>
            {notifications.map(notification => (
              <li key={notification._id} className="bg-white mb-4 p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-gray-500 text-sm">{new Date(notification.date).toLocaleString()}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DashBoard;
