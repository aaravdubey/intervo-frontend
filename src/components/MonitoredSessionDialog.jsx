import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Make sure to import useNavigate
import { FcWebcam } from "react-icons/fc";

const MonitoredSessionDialog = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleStart = async () => {
    try {
      // // Request fullscreen and wait for it to complete
      // await document.documentElement.requestFullscreen();
      // Navigate to aptiexam after entering fullscreen
      navigate("/test");
    } catch (err) {
      console.error("Failed to enter fullscreen mode:", err);
    }
  };

  // Disable unwanted interactions
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
      }
    };

    const handleCopy = (e) => {
      e.preventDefault();
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };


    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // For browsers to show a warning
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-xl p-8 w-1/2 ">
        <div className="flex items-start space-x-24">
          <div>
            <h2 className="text-2xl font-bold mb-4">Monitored Session</h2>
            <p className="text-justify mt-11">Intervo will monitor your session for review</p>
            <p className="mb-4 text-justify mt-3">
              Please note that by proceeding to participate and/or complete this
              session you consent to be monitored via video/screen feed. This
              monitoring is being undertaken to eliminate any use of unfair
              means during conduct of this session.
            </p>
            <p className="mb-6 text-justify">
              The said video/screen feed can be viewed whether on a real basis
              and/or accessed subsequently by an authorised person only.
            </p>
          </div>
          <FcWebcam size={310} className="ml-10" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <Link to="/home">
          <button
          
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button></Link>
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoredSessionDialog;
