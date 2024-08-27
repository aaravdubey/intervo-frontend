import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeBatches: 0,
    completedBatches: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const socket = io('http://localhost:3000'); // Ensure this matches your backend URL

    socket.on('metricsUpdate', (data) => {
      setMetrics(data);
    });

    socket.on('chartUpdate', (data) => {
      setRealTimeData(data);
    });

    return () => socket.disconnect();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">{metrics.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Batches</h2>
          <p className="text-3xl font-bold text-gray-800">{metrics.activeBatches}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Completed Batches</h2>
          <p className="text-3xl font-bold text-gray-800">{metrics.completedBatches}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Batch Activity</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={realTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
