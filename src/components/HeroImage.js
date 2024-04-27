import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assets/texture-cracked-old-asphalt.webp'; // Ganti dengan path gambar Anda
import image2 from '../assets/istockphoto-lubang.jpg'; // Ganti dengan path gambar Anda
import image3 from '../assets/maincropped_lubang.jpg'; // Ganti dengan path gambar Anda

import './HeroImage.css'

export class HeroImage extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={image2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={image3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Caption>
          <h1 className="horizontal-line">Welcome to <br></br> Sobat Jabar</h1>
          <p>Selamat datang di Peta Kerusakan Jalan! Kami menyediakan informasi terkini tentang kondisi jalan di berbagai wilayah, termasuk kerusakan yang perlu perhatian. Dengan menggunakan peta interaktif kami, Anda dapat melihat daftar kerusakan jalan, detail lokasi, serta informasi terkait pemeliharaan yang sedang dilakukan.
             Sistem kami memungkinkan Anda untuk melaporkan kerusakan jalan yang Anda temui langsung dari lokasi, sehingga kami dapat segera mengambil tindakan untuk memperbaikinya</p>
          <button className="btn" >
            <Link to='/map' className='btn'>Get Started</Link>
          </button>
        </Carousel.Caption>
      </Carousel>
      
    )
  }
}

export default HeroImage