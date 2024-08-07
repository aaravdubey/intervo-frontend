import React, { useState, useEffect } from 'react';
import sampleImage from '../assets/logo.png'; // Import your image

const TestComponent = () => {
  const [time, setTime] = useState(30 * 60); // 30 minutes in seconds

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      // Request fullscreen again if it was exited
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Failed to re-enter fullscreen mode:", err);
      });
    }
  };

  const handleBeforeUnload = (event) => {
    // Prevent refresh or close
    event.preventDefault();
    event.returnValue = ''; // Required for most browsers to show confirmation dialog
  };

  const handleKeyDown = (event) => {
    // Prevent page refresh with F5, Ctrl+R and prevent exiting fullscreen with ESC
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r') || event.key === 'Escape') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    let timerId;

    if (time > 0) {
      timerId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second
    } else {
      clearInterval(timerId); // Ensure timer stops when time runs out
    }

    return () => {
      clearInterval(timerId); // Clean up timer on component unmount
    };
  }, [time]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Ensure fullscreen request is triggered by user action
    const requestFullscreen = () => {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Failed to enter fullscreen mode:", err);
      });
    };

    // Ensure the request is made after component mounts
    requestFullscreen();

    return () => {
      // Optional: Clean up if needed
    };
  }, []);

  const preventCopyPaste = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alert("Copying and pasting is disabled.");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center select-none">
      <header className="bg-white w-full p-4 flex justify-between items-center shadow">
        <div className="text-lg font-semibold flex items-center">
          <img src={sampleImage} alt="Interview Icon" className="h-10 w-28 mr-2" />
        </div>
        <div className="mb-2 text-black">
          Time Left: {formatTime(time)}
        </div>
        <div className="text-red-500 cursor-pointer">Finish Test</div>
      </header>
      <main className="bg-white shadow p-8 m-4 w-4/5 min-h-[600px]">
        <div className="flex justify-between mb-4">
          <div>Section #2</div>
          <div>Attempted: 2/3</div>
        </div>
        <div className="flex border-t pt-4">
          <div className="w-1/2 pr-8 border-r">
            <h2 className="text-lg font-bold mb-4">Question 1</h2>
            <p className="mb-4">
              In order to describe the stable system, what should be the value for gain margin and phase margin?
            </p>
            <div className="text-sm text-gray-500 cursor-pointer">Revisit Later</div>
          </div>
          <div className="w-1/2 pl-8">
            <h2 className="text-lg font-bold mb-4">Select an option</h2>
            <form>
              <div className="mb-3 flex items-center">
                <input type="radio" name="answer" value="positive_positive" className="form-radio" />
                <label className="ml-2">Positive, Positive</label>
              </div>
              <div className="mb-3 flex items-center">
                <input type="radio" name="answer" value="positive_negative" className="form-radio" />
                <label className="ml-2">Positive, Negative</label>
              </div>
              <div className="mb-3 flex items-center">
                <input type="radio" name="answer" value="negative_positive" className="form-radio" />
                <label className="ml-2">Negative, Positive</label>
              </div>
              <div className="mb-3 flex items-center">
                <input type="radio" name="answer" value="negative_negative" className="form-radio" />
                <label className="ml-2">Negative, Negative</label>
              </div>
            </form>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Next</button>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-4 right-4">
        {/* Optionally add footer content here */}
      </footer>
    </div>
  );
}

export default TestComponent;
