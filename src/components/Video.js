import React from 'react'
import './Video.css'
import { Link } from 'react-router-dom'

import spaceVideo from '../assets/road.jpg'

const Video = () => {
  return (
    <div className='hero'>
      <img id='img' src={spaceVideo} alt='gambar jalan'>
        {/* <source  /> */}
      </img>
      <div className='content'>
        <h1>Sobat Jabar</h1>
        <p>"Mupujaan aman sareng nyaman, warga bahagia Jawa Barat pasti juara."</p>
        <div>
          <Link to='/training' className='btn'>About Apps</Link>
          <Link to='/map' className='btn btn-light'>Launch Map</Link>
        </div>
      </div>
    </div>
  )
}

export default Video