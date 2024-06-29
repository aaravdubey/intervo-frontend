import React, { useRef, useEffect, useState, useCallback } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Link } from 'react-router-dom';

export default function Rounds() {
  const [isVerified, setIsVerified] = useState(false);
  const [mediaEnabled, setMediaEnabled] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('checking');
  const [microphoneStatus, setMicrophoneStatus] = useState('checking');
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      // Add more models if needed
    };
    loadModels();
  }, []);

  const handleNext = () => {
    setShowInstructionsModal(false);
    setShowVerifyModal(true);
  };

  const verifyUser = () => {
    // Implement user verification logic here
    setIsVerified(true);
    setShowVerifyModal(false);
  };

  const enableMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaEnabled(true);
        setCameraStatus('verified');
        setMicrophoneStatus('verified');
        // You can use the stream object for video/audio elements if needed
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err);
        setCameraStatus('failed');
        setMicrophoneStatus('failed');
      });
  };

  const startTest = () => {
    // Implement the logic to start the test
    alert('Test started!');
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const WebcamCapture = () => {
    const webcamRef = useRef(null);

    const detectFace = useCallback(async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
        setFaceDetected(!!detection);
      }
    }, []);

    useEffect(() => {
      const interval = setInterval(detectFace, 1000); // Check for face every second
      return () => clearInterval(interval);
    }, [detectFace]);

    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      // Send the captured image to the backend
      fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageSrc })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    return (
      <>
        {capturedImage === null && (
          <>
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
            <button 
              onClick={capture} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={!faceDetected}
            >
              {faceDetected ? "Capture Photo" : "No Face Detected"}
            </button>
          </>
        )}
        {capturedImage && (
          <>
            <img src={capturedImage} alt="Captured" className="mt-4" />
            <button 
              onClick={() => setCapturedImage(null)} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Retake Photo
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {showInstructionsModal && (
        <div id="instructions-modal" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Instructions for the Aptitude Test</h3>
                <p className="mb-3 text-gray-500 mt-9 dark:text-gray-400">Please read the following instructions carefully:</p>
                <ul className="list-disc mt-6 list-inside mb-3 text-left text-gray-500 dark:text-gray-400">
                  <li>Number of questions: 50</li>
                  <li>Total marks: 100</li>
                  <li>Total time: 60 minutes</li>
                  <li>Ensure you have a stable internet connection</li>
                  <li>Do not refresh the page during the test</li>
                </ul>
                <button 
                  onClick={handleNext} 
                  className="text-white mt-9 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showVerifyModal && (
        <div id="verify-modal" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal pt-6  text-gray-500 dark:text-gray-400">Verify your identity to proceed</h3>
                <button 
                  onClick={verifyUser} 
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, verify me
                </button>
                <Link to='/home'>
                <button 
                  onClick={() => setShowVerifyModal(false)} 
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="shadow-lg rounded-lg p-1 max-w-full w-full flex">
          <div className="w-2/3 mx-auto pr-4">
            

            {isVerified && !mediaEnabled && (
              <div className="mb-4">
                <h1 className="text-2xl mx-auto font-bold mb-6 text-center">Online Aptitude Test</h1>
                <button
                  onClick={enableMedia}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Enable Camera and Microphone
                </button>
              </div>
            )}

            {isVerified && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  
                  <input
                    type="radio"
                    checked={cameraStatus === 'verified'}
                    readOnly
                    className="form-radio text-green-500"
                  />
                  <label className="ml-2 text-gray-700">
                    {cameraStatus === 'checking' ? 'Checking camera...' : 'Camera Verified'}
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    checked={microphoneStatus === 'verified'}
                    readOnly
                    className="form-radio text-green-500"
                  />
                  <label className="ml-2 text-gray-700">
                    {microphoneStatus === 'checking' ? 'Checking microphone...' : 'Microphone Verified'}
                  </label>
                </div>
              </div>
            )}

            {isVerified && mediaEnabled && capturedImage && (
              <div className="mb-4 mt-40">
                <button
                  onClick={startTest}
                  className="bg-purple-500 mx-28 mt-11 hover:bg-purple-600 text-white font-bold py-2 w-1/2 px-4 rounded-md"
                >
                  Start Test
                </button>
              </div>
            )}
          </div>
          <div className="w-1/3 pl-4">
            {isVerified && mediaEnabled && <WebcamCapture />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
