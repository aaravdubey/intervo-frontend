import React from 'react'

export default function CandidateDestailsForm() {
  return (
    <div>
      <div className="bg-white  rounded-lg p-4  max-w-sm">
  <div className="flex items-center mx- mb-4">
  <div className=" bg-teal-blue w- rounded-lg p-2 top-0 mr-3">
      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
    <h2 className="text-xl text-center font-semibold text-gray-700">Candidate Details</h2>
  </div>
  
  <div className="flex justify-center mt-14 mb-4">
    <div className="bg-blue-800 rounded-full p-4">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
  </div>
  <div className='mx-28'>
     
    <p className="text-sm text-center pt-2 text-gray-600">Candidate Name</p>
    <p className="font-medium text-center">Demo Candidate</p>
    
    <p className="text-sm text-center pt-4 text-gray-600">Candidate E-mail Id</p>
    <p className="font-medium text-center">demo@evalground.com</p>
    
    <p className="text-sm text-center pt-4 text-gray-600">Candidate Contact Number</p>
    <p className="font-medium text-center">+91-9980992834</p>
  </div>
</div>
    </div>
  )
}
