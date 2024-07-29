// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard.jsx'; // Assume you have a component for questions
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export default function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Track the currently active tab

  useEffect(() => {
    // Fetch questions from API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE}/candidate/test/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle time up logic here
      alert('Time is up!');
      setTestStarted(false);
    }

    return () => clearInterval(timer);
  }, [testStarted, timeLeft]);

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
     
      <div className="container mx-auto mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg flex">
          <div className="w-1/3">
            <h2 className="text-lg font-semibold mb-4">Questions</h2>
            <div className="flex flex-col">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  className={`py-2 px-4 mb-2 text-left ${index === activeTab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(index)}
                >
                  Question {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="w-2/3 pl-6">
            <h1 className="text-2xl font-bold mb-4">Online Test</h1>
            {testStarted ? (
              <div className="mb-6">
                <p className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</p>
                <div className="mt-4">
                  {questions[activeTab] && (
                    <QuestionCard question={questions[activeTab]} />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg mb-4">Click below to start the test.</p>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleStartTest}
                >
                  Start Test
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}
