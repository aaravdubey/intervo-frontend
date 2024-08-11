import React from 'react'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import AptitudeHome from '../components/AptitudeHome.jsx'

export default function Rounds() {
  return (
    <div>
      <Header/>
      <div className='bg-gray-200 '>
      <AptitudeHome />
      </div>
      <Footer/>
    </div>
  )
}
