import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      // Request fullscreen and wait for it to complete
      await document.documentElement.requestFullscreen();
      // Navigate to aptiexam after entering fullscreen
      navigate("/aptiexam");
    } catch (err) {
      console.error("Failed to enter fullscreen mode:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 flex flex-col items-center select-none">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <button
        onClick={handleStart}
        className="inline-flex items-center px-4 py-2.5 mt-2 ml-2 text-sm font-medium text-center text-white bg-green-600 rounded hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
      >
        Start
      </button>
    </div>
  );
};
