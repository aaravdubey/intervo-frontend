import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import  Instructions from '../assets/image.png'

export default function UserValidation() {
    const [systemCompatible, setSystemCompatible] = useState(false);
    const [webcamPermission, setWebcamPermission] = useState(false);
    const [audioPermission, setAudioPermission] = useState(false);
    const [proceeded, setProceeded] = useState(false);
    const [activeTab, setActiveTab] = useState('registration');
    const [showCaptureInstructions, setShowCaptureInstructions] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCaptured, setIsCaptured] = useState(false);
  
    useEffect(() => {
        const loadModels = async () => {
            
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.tinyYolov2.loadFromUri('/models'); 
          };
          
      loadModels();
      startVideo();
    }, []);
  
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            let video = videoRef.current;
            if (video) {
              video.srcObject = stream;
              video.onloadedmetadata = () => {
                video.play();
              };
            }
          })
          .catch(err => console.error('Error accessing the webcam:', err));
      };
      
  
    const handleVideoPlay = () => {
      setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          ).withFaceLandmarks();
  
          const canvas = canvasRef.current;
          const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
          faceapi.matchDimensions(canvas, displaySize);
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
      }, 100);
    };
  
    const captureImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setIsCaptured(true);
      // Here you can save or process the imageDataUrl
    };

    useEffect(() => {
        // Check system compatibility when component mounts
        checkSystemCompatibility();
    }, []);

    // Function to check system compatibility
    const checkSystemCompatibility = () => {
        // Example criteria: Check if browser supports necessary features
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            setSystemCompatible(true);
        } else {
            setSystemCompatible(false);
        }
    };

    // Function to simulate webcam permission check
    const checkWebcamPermission = () => {
        // Simulate checking webcam permissions
        setWebcamPermission(true); // Update state based on actual checks
    };

    // Function to simulate audio permission check
    const checkAudioPermission = () => {
        // Simulate checking audio permissions
        setAudioPermission(true); // Update state based on actual checks
    };

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowCaptureInstructions(false); // Reset capture instructions when changing tabs
    };

    // Function to proceed to the next tab
    const handleProceed = () => {
        if (activeTab === 'registration') {
            // Proceed to Webcam Image Upload tab
            setActiveTab('webcam');
        } else if (activeTab === 'webcam') {
            // Proceed to ID Card Capture tab
            setActiveTab('idCard');
        } else {
            // Handle additional steps or completion
            setProceeded(true);
        }
    };

    // Function to toggle capture instructions visibility
    const toggleCaptureInstructions = () => {
        setShowCaptureInstructions(true);
    };

    // Function to reset the proceed state (for demo purposes)
    const resetProceed = () => {
        setProceeded(false);
        setActiveTab('registration'); // Reset to first tab
    };

    // Function to determine the text for the proceed button based on active tab
    const getProceedButtonText = () => {
        if (activeTab === 'registration') {
            return 'Proceed to Webcam Image Upload';
        } else if (activeTab === 'webcam') {
            return 'Proceed to ID Card Capture';
        } else {
            return 'Complete';
        }
    };

    // Content for left panel instructions based on active tab
    const leftPanelContent = () => {
        if (activeTab === 'webcam' && showCaptureInstructions) {
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Instructions for Webcam Image Capture</h1>
                    <img src={Instructions} className="ml-0 h- w-full" alt="Flowbite Logo" />
                </>
            );
        } else if (activeTab === 'idCard') {
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Instructions for ID Card Capture</h1>
                    <p className="mb-4">Follow these steps to capture your ID card:</p>
                    <ol className="list-decimal list-inside">
                        <li>Place your ID card on a flat surface.</li>
                        <li>Click the "Capture ID Card" button to take a picture.</li>
                    </ol>
                </>
            );
        } else {
            // Default content for registration or other cases
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Hi,</h1>
                    <h2 className="text-3xl font-bold mb-8">Welcome to</h2>
                    <h3 className="text-4xl font-bold mb-12">Sample Test-copy</h3>

                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold">Questions</p>
                            <p>4 Questions</p>
                        </div>
                        <div>
                            <p className="font-semibold">Sections</p>
                            <p>2 Sections</p>
                        </div>
                        <div>
                            <p className="font-semibold">Test Duration</p>
                            <p>60 Minutes</p>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <Header />
            <div className="flex h-auto mb-48 bg-gray-100">
                {/* Left Panel */}
                <div className="w-1/3 p-8 bg-white ">
                    {leftPanelContent()}
                </div>

                {/* Right Panel */}
                <div className="w-2/3 mt-11 pl-32 p-8">
                    {/* Tab Navigation */}
                    <ul className="flex mb-8">
                        <li className={`mr-6 cursor-pointer ${activeTab === 'registration' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('registration')}>User Registration</li>
                        <li className={`mr-6 cursor-pointer ${activeTab === 'webcam' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('webcam')}>Webcam Image Upload</li>
                        <li className={`cursor-pointer ${activeTab === 'idCard' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('idCard')}>ID Card Capture</li>
                    </ul>

                    {/* Tab Content */}
                    {activeTab === 'registration' && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">User Registration</h2>
                            <form>
                                <label className="block mb-2">Name:</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-2 mb-2" placeholder="Enter your name" />
                                <label className="block mb-2">Email:</label>
                                <input type="email" className="border border-gray-300 rounded mb-4 px-3 py-2" placeholder="Enter your email" />
                                
                            </form>
                            <button type="button" onClick={handleProceed} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{getProceedButtonText()}</button>
                        </div>
                    )}

                    {activeTab === 'webcam' && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Webcam Image Upload</h2>
                            <p className="mb-4 text-sm text-gray-600">
        Please align yourself to the center of the screen and press 'Capture Your Face' button.
      </p>
      <div className="relative">
        <video ref={videoRef} width="350" height="280" autoPlay onPlay={handleVideoPlay} />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="mt-4">
        <button
          className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded"
          onClick={() => setIsCaptured(false)}
        >
          Re-Capture Your Face
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={isCaptured ? null : captureImage}
        >
          {isCaptured ? 'Proceed' : 'Capture Your Face'}
        </button>
      </div>
                            {/* Implement webcam image capture functionality here */}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleCaptureInstructions}>Capture Image</button>
                        </div>
                    )}

                    {activeTab === 'idCard' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">ID Card Capture</h2>
                            <p className="mb-2">Capture an image of your ID card:</p>
                            {/* Implement ID card image capture functionality here */}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProceed}>{getProceedButtonText()}</button>
                        </div>
                    )}

                    {/* Button to reset the state (for demo purposes) */}
                   
                </div>
            </div>
            <Footer />
        </>
    );
}
