import React, { useState, useEffect } from 'react';
import InterviewCard from '../components/card.jsx';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';


export default function ScheduledInterview() {
  // Example interview data
  const interviews = [
  {
    id: 1,
    title: 'Software Devloper',
    description: 'Valid Till:10-24-2024',
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s' ,
  },
  {
    id: 2,
    title: 'Frontend Developer',
    description:'Valid Till:10-24-2024',
    
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s', // Replace with your image URL
  },
  {
    id: 3,
    title: 'Backend Developer',
    description: 'Valid Till:10-24-2024',
    
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWW9_d3hUdxBZ5W_Ltnlm7hD8fR-3jhvpAYg&s', // Replace with your image URL
  },
];

  return (
    <>
      <Header />
      <div className="container mb-24 mt-8 ">
        
        <div className="flex  space-x-24  overflow-x-auto ">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
       
      </div>
      <Footer />
    </>
  );
};
