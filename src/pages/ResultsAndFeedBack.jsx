import React from 'react'
import Header from '../components/header.jsx'
import Footer from'../components/footer.jsx'
import CandidateDestailsForm from '../components/CandidateDestailsForm.jsx'
import OverallResult from '../components/OverallResult.jsx'
import TimeAnalysis from '../components/TimeAnalysis.jsx'
import SectionPerformance from '../components/SectionPerformance.jsx'

export default function ResultsAndFeedBack() {
  return (
    <div className='min-h-screen'>
        <Header/>
      
    <div className="container mx-auto p-4">
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-6">
        {/* Candidate Details */}
        <div className="bg-white w-2/3  shadow-xl  p-4">
      
          
         <CandidateDestailsForm/>
        </div>

        {/* Overall Result */}
        <div className="bg-white rounded-lg w-full shadow-xl p-4">
          
         <OverallResult/>
        </div>

        {/* Time Analysis */}
        <div className="bg-white rounded-lg shadow-xl p-4 col-span-2">

         <TimeAnalysis/>
        </div>

        {/* Section-wise Performance Analysis */}
        <div className="bg-white rounded-lg shadow-xl p-4 col-span-2">
          
         <SectionPerformance/>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}
