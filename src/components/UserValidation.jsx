import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Instructions from '../assets/image.png';

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

    useEffect(() => {
        const loadModels = async () => {
            try {
                // Load face detection model
                await faceapi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights');

                console.log('Models loaded');
            } catch (error) {
                console.error('Error loading models:', error);
            }
        };
        loadModels();
        checkSystemCompatibility();
    }, []);

    useEffect(() => {
        if (activeTab === 'webcam') {
            startVideo();
        }
    }, [activeTab]);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
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
        setInterval(async () => {
            if (videoRef.current && canvasRef.current) {
                const detection = await faceapi.detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                );

                const canvas = canvasRef.current;
                const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
                faceapi.matchDimensions(canvas, displaySize);

                if (detection) {
                    setFaceDetected(true); // Set state to true if face is detected
                } else {
                    setFaceDetected(false); // Set state to false if no face detected
                }
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

    const checkSystemCompatibility = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            setSystemCompatible(true);
        } else {
            setSystemCompatible(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowCaptureInstructions(false); // Reset capture instructions when changing tabs
    };

    const handleProceed = () => {
        if (activeTab === 'registration') {
            setActiveTab('webcam');
        } else if (activeTab === 'webcam') {
            setActiveTab('idCard');
        } else {
            setProceeded(true);
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
        } else {
            return 'Complete';
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
                        <li>Place your ID card on a flat surface.</li>
                        <li>Click the "Capture ID Card" button to take a picture.</li>
                    </ol>
                </>
            );
        } else {
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
                <div className="w-1/3 p-8 bg-white ">
                    {leftPanelContent()}
                </div>
                <div className="w-2/3 mt-11 pl-32 p-8">
                    <ul className="flex mb-8">
                        <li className={`mr-6 cursor-pointer ${activeTab === 'registration' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('registration')}>User Registration</li>
                        <li className={`mr-6 cursor-pointer ${activeTab === 'webcam' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('webcam')}>Webcam Image Upload</li>
                        <li className={`cursor-pointer ${activeTab === 'idCard' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => handleTabChange('idCard')}>ID Card Capture</li>
                    </ul>

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
                                    className={`px-4 py-2 bg-blue-500 text-white rounded ${faceDetected ? '' : 'opacity-50 cursor-not-allowed'}`}
                                    onClick={faceDetected ? captureImage : null}
                                    disabled={!faceDetected} // Disable button if no face detected
                                >
                                    {isCaptured ? 'Proceed' : 'Capture Your Face'}
                                </button>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleCaptureInstructions}>Capture Image</button>
                        </div>
                    )}

                    {activeTab === 'idCard' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">ID Card Capture</h2>
                            <p className="mb-2">Capture an image of your ID card:</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProceed}>{getProceedButtonText()}</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
