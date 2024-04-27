import React from 'react'
import Navbar from '../components/Navbar'
import HeroImage from '../components/HeroImage2'
import Footer from '../components/Footer'
import AboutPages from '../components/aboutPages'

const Training = () => {
  return (
    <div>
      <Navbar />
      <HeroImage heading='About Apps' text='Yuk mengenal lebih jauh tentang Kami!' />
      <AboutPages />

      <Footer />
    </div>
  )
}

export default Training