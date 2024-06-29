import React, { useEffect, useState } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const API_URL_TOP_150 = 'https://6678e3a30bd4525056202811.mockapi.io/api/vi/150aptitudeQuestions/aptitude150'; // Replace with actual API URL
const API_URL_TOPIC_WISE = 'https://api.example.com/topic-wise-questions'; // Replace with actual API URL

export default function Practice() {
  const [top150Questions, setTop150Questions] = useState([]);
  const [topicWiseQuestions, setTopicWiseQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchTop150Questions();
    fetchTopicWiseQuestions();
  }, []);

  const fetchTop150Questions = async () => {
    try {
      const response = await fetch(API_URL_TOP_150);
      const data = await response.json();
      setTop150Questions(data);
    } catch (error) {
      console.error('Error fetching top 150 questions:', error);
    }
  };

  const fetchTopicWiseQuestions = async () => {
    try {
      const response = await fetch(API_URL_TOPIC_WISE);
      const data = await response.json();
      setTopicWiseQuestions(data);
    } catch (error) {
      console.error('Error fetching topic-wise questions:', error);
    }
  };

  const handleOptionClick = (questionId, option) => {
    setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
    setShowCorrectAnswer(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header/>
      <header className="bg-white w-1/2 rounded-full mx-auto mt-3 shadow ">
        <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl text-center rounded-xl font-bold text-gray-900">Practice Aptitude Questions</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Top 150 Questions */}
          <section className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl text-center mt-2 font-semibold text-gray-800 mb-4">
              <button
                className="text-blue-500 text-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Top 150 Questions {isDropdownOpen ? '▲' : '▼'}
              </button>
            </h2>
            {isDropdownOpen && (
              <div className="space-y-4">
                {top150Questions.map((q, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-700">{q.question}</p>
                    {q.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className="block bg-gray-200 p-2 mt-2 rounded"
                        onClick={() => handleOptionClick(q.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                    {showCorrectAnswer[q.id] && (
                      <p className={`mt-2 ${selectedOptions[q.id] === q.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedOptions[q.id] === q.correct_answer ? 'Correct!' : `Incorrect. Correct answer is: ${q.correct_answer}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Topic-wise Practice */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topic-wise Practice</h2>
            <div className="space-y-4">
              {topicWiseQuestions.map((topic, index) => (
                <div key={index}>
                  <h3 className="text-xl font-medium text-gray-700">{topic.name}</h3>
                  {topic.questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4">
                      <p className="text-gray-700">{q.question}</p>
                      {q.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className="block bg-gray-200 p-2 mt-2 rounded"
                          onClick={() => handleOptionClick(q.id, option)}
                        >
                          {option}
                        </button>
                      ))}
                      {showCorrectAnswer[q.id] && (
                        <p className={`mt-2 ${selectedOptions[q.id] === q.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                          {selectedOptions[q.id] === q.correct_answer ? 'Correct!' : `Incorrect. Correct answer is: ${q.correct_answer}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
