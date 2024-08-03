import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Instructions from '../assets/image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

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
    const [faceDetected, setFaceDetected] = useState(false); // Track if a face is detected
    const [capturedImage, setCapturedImage] = useState(null); // State to hold captured image data URL
    const [idCardCapturedImage, setIdCardCapturedImage] = useState(null); // State to hold captured ID card image data URL
    const [interview, setInterview] = useState(null);
    const [isRetake, setIsRetake] = useState(false); // Track if retake is requested
    const [isTabNavigationDisabled, setIsTabNavigationDisabled] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found in local storage');

                const response = await axios.get(`${API_BASE}/candidate/interviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Fetched interviews:', response.data);

                // Assume the first interview in the list is the one to display
                const interviewDetails = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
                setInterview(interviewDetails);
            } catch (error) {
                console.error('Error fetching interviews:', error);
                setInterview(null); // Set to null in case of error
            }
        };

        fetchInterviews();
    }, []);

    const Name = interview?.name || 'Name';

    useEffect(() => {
        const loadModels = async () => {
            try {
                if (!faceapi.nets.tinyFaceDetector.isLoaded) {
                    await faceapi.nets.tinyFaceDetector.loadFromUri('/weights');
                }
                console.log('Models loaded');
            } catch (error) {
                console.error('Error loading models:', error);
            }
        };
        
        loadModels();
        checkSystemCompatibility();
    }, []);
    

    useEffect(() => {
        if (activeTab === 'webcam' || activeTab === 'idCard') {
            startVideo();
        }
    }, [activeTab]);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
            .then(stream => {
                let video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                    };
                    setWebcamPermission(true);
                }
            })
            .catch(err => {
                console.error('Error accessing the webcam:', err);
                setWebcamPermission(false);
            });
    };
    

    const handleVideoPlay = () => {
        const detectFace = async () => {
            if (videoRef.current && canvasRef.current) {
                const detection = await faceapi.detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                );
    
                const canvas = canvasRef.current;
                if (canvas) {
                    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
                    faceapi.matchDimensions(canvas, displaySize);
    
                    if (detection) {
                        setFaceDetected(true);
                    } else {
                        setFaceDetected(false);
                    }
                } else {
                    console.error('Canvas is not available');
                }
            }
            requestAnimationFrame(detectFace);
        };
        detectFace();
    };
    

    const captureImage = async (type) => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
    
        if (type === 'face') {
            setCapturedImage(imageDataUrl);
            setIsCaptured(true);
        } else if (type === 'idCard') {
            setIdCardCapturedImage(imageDataUrl);
        }
    
        // Reset the retake state after capturing
        setIsRetake(false);
    };
    
    

    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE}/candidate/register`, userData);
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const uploadFaceImage = async () => {
        try {
            // Send the data URL as part of the request body
            const response = await axios.post(`${API_BASE}/candidate/uploadface`, {
                faceImage: capturedImage, // Send Data URL as part of the request
                email: email
            });
    
            console.log('Face image uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading face image:', error);
        }
    };
    
   
    
    const dataUrlToBlob = (dataUrl) => {
        const [header, data] = dataUrl.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const byteCharacters = atob(data);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        return new Blob(byteArrays, { type: mime });
    };
    
    const uploadIdCardImage = async () => {
        try {
            const response = await axios.post(`${API_BASE}/candidate/upload-idcard`, {
                idCardImage: idCardCapturedImage, // Make sure this is the correct variable
                email: email
            });
    
            console.log('ID card uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading ID card image:', error);
        }
    };
    

    const checkSystemCompatibility = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            setSystemCompatible(true);
        } else {
            setSystemCompatible(false);
        }

        // Check for webcam and audio permissions
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setWebcamPermission(true);
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(() => {
                setWebcamPermission(false);
            });

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                setAudioPermission(true);
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(() => {
                setAudioPermission(false);
            });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowCaptureInstructions(tab === 'webcam'); // Adjust as needed for showing instructions
        if (tab === 'webcam' || tab === 'idCard') {
            startVideo(); // Start the video stream when tab is 'webcam' or 'idCard'
        }
    };

    const handleProceed = async () => {
        try {
            if (!proceeded) {
                // If not yet proceeded, move to the registration tab
                setActiveTab('registration');
            } else if (activeTab === 'registration') {
                const userData = {
                    name: name,
                    email: email
                };
    
                // Register the user and await the response
                await registerUser(userData);
    
                // Move to the next tab
                setActiveTab('webcam');
            } else if (activeTab === 'webcam') {
                // Upload face image and await the response
                await uploadFaceImage();
    
                // Move to the next tab
                setActiveTab('idCard');
            } else if (activeTab === 'idCard') {
                // Upload ID card image and await the response
                await uploadIdCardImage();
    
                // Redirect to another page
                window.location.href = "/monitor";
            }
    
            // Set proceeded to true after completing the actions
            setProceeded(true);
        } catch (error) {
            console.error('Error during proceed:', error);
            // Optionally, you might want to handle errors or show a message to the user
        }
    };
    
  
    const toggleCaptureInstructions = () => {
        setShowCaptureInstructions(true);
    };

    const resetProceed = () => {
        setProceeded(false);
        setActiveTab('registration'); // Reset to first tab
    };

    const getProceedButtonText = () => {
        if (activeTab === 'registration') {
            return 'Proceed to Webcam Image Upload';
        } else if (activeTab === 'webcam') {
            return 'Proceed to ID Card Capture';
        }
    };

    const leftPanelContent = () => {
        if (activeTab === 'webcam' && showCaptureInstructions) {
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Instructions for Webcam Image Capture</h1>
                    <img src={Instructions} className="ml-0 h- w-full" alt="Instructions" />
                </>
            );
        } else if (activeTab === 'idCard') {
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Instructions for ID Card Capture</h1>
                    <p className="mb-4">Follow these steps to capture your ID card:</p>
                    <ol className="list-decimal list-inside">
                        <li>Place your ID card in front for the webcam.</li>
                        <li>Click the "Capture ID Card" button to take a picture.</li>
                    </ol>
                </>
            );
        } else if (activeTab === 'registration') {
            return (
                <>
                    <h1 className="text-2xl font-semibold mb-4">Hi {Name},</h1>
                    <h2 className="text-3xl font-bold mb-8">Welcome to</h2>
                    <h3 className="text-4xl font-bold mb-12">Aptitude Round</h3>
    
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
        } else {
            return      <>
            <h1 className="text-2xl font-semibold mb-4">Instructions for Webcam Image Capture</h1>
            <img src={Instructions} className="ml-0 h- w-full" alt="Instructions" />
        </>// Fallback content
        }
    };
    
    

    const rightPanelContent = () => {
        return (
            <div className="mb-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Requesting Microphone/Webcam permission</h2>
                <ul>
                    <li className={`mb-6 mt-10 ${systemCompatible ? 'text-green-500' : 'text-red-500'}`}>
                        {systemCompatible ? '✔️' : '❌'} System Compatibility
                    </li>
                    <li className={`mb-6 ${webcamPermission ? 'text-green-500' : 'text-red-500'}`}>
                        {webcamPermission ? '✔️' : '❌'} Webcam Permissions
                    </li>
                    <li className={`mb-6 ${audioPermission ? 'text-green-500' : 'text-red-500'}`}>
                        {audioPermission ? '✔️' : '❌'} Audio Permissions
                    </li>
                </ul>
                {!systemCompatible && <p className="text-red-500 mb-4">Please ensure your system supports media devices.</p>}
                {!webcamPermission && <p className="text-red-500 mb-4">Please allow webcam access.</p>}
                {!audioPermission && <p className="text-red-500 mb-4">Please allow microphone access.</p>}
                {systemCompatible && webcamPermission && audioPermission && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-12 rounded" onClick={handleProceed}>Proceed</button>
                )}
            </div>
        );
    };

    const contentAfterProceed = () => {
        return (
            <>
                 <ul className="flex mb-8">
                <li 
                    className={`mr-6 cursor-pointer ${activeTab === 'registration' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    // Disable click if navigation is disabled
                >
                    User Registration
                </li>
                <li 
                    className={`mr-6 cursor-pointer ${activeTab === 'webcam' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                     // Disable click if navigation is disabled
                >
                    Webcam Image Upload
                </li>
                <li 
                    className={`cursor-pointer ${activeTab === 'idCard' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    // Disable click if navigation is disabled
                >
                    ID Card Capture
                </li>
            </ul>

                {activeTab === 'registration' && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">User Registration</h2>
                        <form>
                            <label className="block mb-2">Name:</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded px-3 w-1/3 py-2 mb-2"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="block mb-2">Email:</label>
                            <input
                                type="email"
                                className="border border-gray-300 rounded px-3 mb-4 w-1/3 py-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                        <button type="button" onClick={handleProceed} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-11 px-4 rounded">{getProceedButtonText()}</button>
                    </div>
                )}

                {activeTab === 'webcam' && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Webcam Image Upload</h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Please align yourself to the center of the screen and press 'Capture Your Face' button.
                        </p>
                        <div className="relative">
                            {isCaptured ? (
                                <img src={capturedImage} alt="Captured" className="max-w-full max-h-60 mb-4" />
                            ) : (
                                <>
                                    <video ref={videoRef} width="350" height="280" autoPlay onPlay={handleVideoPlay} />
                                    <canvas ref={canvasRef} className="absolute top-0 left-0" />
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            {!isCaptured && (
                                <button
                                    className={`px-4 py-2 bg-blue-500 text-white rounded ${faceDetected ? '' : 'opacity-50 cursor-not-allowed'}`}
                                    onClick={faceDetected ? () => captureImage('face') : null}
                                    disabled={!faceDetected} // Disable button if no face detected
                                >
                                    Capture Your Face
                                </button>
                            )}
                            {isCaptured && (
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={handleProceed}
                                >
                                    Proceed
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'idCard' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">ID Card Capture</h2>
                        <p className="mb-2">Capture an image of your ID card:</p>
                        <div className="relative">
                            {idCardCapturedImage ? (
                                <img src={idCardCapturedImage} alt="Captured ID Card" className="max-w-full max-h-60 mb-4" />
                            ) : (
                                <>
                                    <video ref={videoRef} width="350" height="280" autoPlay onPlay={handleVideoPlay} />
                                    <canvas ref={canvasRef} className="absolute top-0 left-0" />
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            {!idCardCapturedImage && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => captureImage('idCard')}>Capture ID Card</button>
                            )}
                            {idCardCapturedImage && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProceed}>Complete</button>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <Header />
            <div className="flex h-auto bg-gray-100 ">
                <div className="w-1/3 p-8 bg-white border-2 border-x-slate-400">
                    {leftPanelContent()}
                </div>
                <div className="w-2/3 h-auto mt-11 pl-32 p-8 ">
                    {!proceeded ? rightPanelContent() : contentAfterProceed()}
                </div>
            </div>
            <Footer />
        </>
    );
}
