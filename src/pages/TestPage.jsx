import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import screenfull from 'screenfull'; // Import screenfull
import {jwtDecode} from 'jwt-decode'; 

const TestPage = () => {
  const [time, setTime] = useState(30 * 60); // 30 minutes
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(20).fill(null)); // Track user answers
  const [correctAnswers, setCorrectAnswers] = useState(new Array(20).fill(null)); // Track correct answers
  const [showResults, setShowResults] = useState(false); // Show results at the end
  const [fadeClass, setFadeClass] = useState('opacity-100'); // Manage fade transition

  // Fetch 20 random questions from the backend
  const fetchRandomQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/questions/random20');
      setQuestions(response.data);
      setCorrectAnswers(response.data.map(question => question.correctOption)); // Set correct answers
      setCurrentIndex(0); // Reset index to start from the first question
    } catch (error) {
      console.error('Error fetching random questions:', error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchRandomQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    let timerId;
    if (time > 0) {
      timerId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            setTime(0);
            setShowResults(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [time]);

  // Fullscreen and event handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!screenfull.isFullscreen) {
        screenfull.request(); // Re-enter fullscreen if exited
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && screenfull.isFullscreen) {
        e.preventDefault(); // Prevent default action for Escape key
        e.stopPropagation(); // Stop event from propagating further
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

    const handleTabChange = (e) => {
      e.preventDefault();
    };

    // Enter fullscreen on component mount
    if (screenfull.isEnabled) {
      screenfull.request();
    }

    // Event listeners
    screenfull.on('change', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('visibilitychange', handleTabChange);

    return () => {
      screenfull.off('change', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('visibilitychange', handleTabChange);
    };
  }, []);

  const handleNextQuestion = () => {
    setAnsweredQuestions(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = selectedAnswer;
      return newAnswers;
    });

    setFadeClass('opacity-0');
    setTimeout(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % questions.length;
        if (newIndex === 0) setShowResults(true); // Show results if it's the last question
        return newIndex;
      });
      setSelectedAnswer(null); // Clear selected answer for the new question
      setFadeClass('opacity-100');
    }, 300); // Match the duration of the fade-out animation
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setSelectedAnswer(answeredQuestions[currentIndex - 1] || null);
    }
  };

  const handleFinish = async () => {
    const token = localStorage.getItem('token');
    
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.id;
      
    setAnsweredQuestions(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = selectedAnswer;
      return newAnswers;
    });
  
    // Calculate correct, wrong answers and other metrics
    const scores = calculateScores();
    const correctAnswersCount = scores.correct;
    const wrongAnswersCount = scores.wrong;
    const questionsAttempted = answeredQuestions.length;
    const marksScored = correctAnswersCount * 2; // Assuming 2 marks for each correct answer
    const percentage = (marksScored / (questionsAttempted * 2)) * 100;
    const timeTaken = 30 * 60 - time; // Time taken in seconds
   
    const testResult = {
      userId: userid, // Replace with actual user ID
      correctAnswersCount,
      wrongAnswersCount,
      marksScored,
      questionsAttempted,
      percentage,
      timeTaken,
      startedAt: new Date(Date.now() - timeTaken * 1000), // Calculate the start time
      endedAt: new Date(),
    };
  
    try {
      // Send the test result to the backend
      await axios.post('http://localhost:3000/api/questions/test-results', testResult);
      setShowResults(true);
    } catch (error) {
      console.error('Error sending test results:', error);
    }
  };
  

  const calculateProgressPercentage = () => {
    return questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const calculateScores = () => {
    const correctCount = answeredQuestions.reduce((count, answer, index) => {
      return count + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
    const wrongCount = answeredQuestions.length - correctCount;
    return { correct: correctCount, wrong: wrongCount };
  };

  const scores = calculateScores();

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F6F8FE] flex flex-col items-center justify-center py-8 px-4">
        <main className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-lg font-medium text-[#2D2F48] mb-6">Test Results</h2>
          <p className="text-lg font-medium text-[#2D2F48] mb-4">Correct Answers: {scores.correct}</p>
          <p className="text-lg font-medium text-[#2D2F48] mb-4">Wrong Answers: {scores.wrong}</p>
          <button
            className="text-lg text-white bg-teal-blue px-6 py-2 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            Restart Test
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FE] flex flex-col items-center justify-between py-8 px-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-[#2D2F48]">INTERVO</h2>
          <p className="text-sm text-[#8A8DAB]">Session 1</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-64 h-2 bg-[#EDEDF2] rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-blue rounded-full transition-all duration-500"
              style={{ width: `${calculateProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-[#8A8DAB]">
            <FontAwesomeIcon icon={faClock} className="text-teal-blue" />
            <span>{formatTime(time)} Min</span>
          </div>
          <div className="text-sm text-[#8A8DAB]">
            {Math.round(calculateProgressPercentage())}% Complete
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        {questions.length > 0 ? (
          <div className={`transition-opacity duration-300 ${fadeClass}`}>
            <h3 className="text-sm font-medium text-[#8A8DAB] mb-4">Question {currentIndex + 1}</h3>
            <p className="text-lg font-medium text-[#2D2F48] mb-6">{questions[currentIndex].question}</p>
            <div className="space-y-4">
              {questions[currentIndex].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center cursor-pointer text-lg bg-[#F6F8FE] p-3 rounded-lg ${selectedAnswer === option ? 'bg-[#EDEDF2]' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <span className="w-6 h-6 border-2 border-teal-blue rounded-full flex items-center justify-center mr-4">
                    <span className={`w-3 h-3 ${selectedAnswer === option ? 'bg-teal-blue' : 'hidden'} rounded-full`}></span>
                  </span>
                  <span className="text-[#2D2F48]">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </main>

      <footer className="w-full max-w-4xl flex justify-between mt-6">
        <button
          className="flex items-center text-lg text-white bg-teal-blue px-6 py-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={handlePreviousQuestion}
          disabled={currentIndex === 0}
        >
          <span className="mr-2">&larr;</span> Previous
        </button>
        <button
          className="flex items-center text-lg text-white bg-teal-blue px-6 py-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={handleNextQuestion}
        >
          Next <span className="ml-2">&rarr;</span>
        </button>
        <button
          className="text-lg text-white bg-teal-blue px-6 py-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={handleFinish}
        >
          Finish
        </button>
      </footer>
    </div>
  );
};

export default TestPage;
