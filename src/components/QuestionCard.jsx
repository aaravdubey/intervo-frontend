import React, { useState } from 'react';

export default function QuestionCard({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
      <div>
        {question.options.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              id={option}
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
