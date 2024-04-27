import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image1 from '../assets/map_icon.png';
import image2 from '../assets/road_icon.png';
import HeroImage from '../components/HeroImage';
import './Home.css'

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    const token = localStorage.getItem('userToken');
  
    if (token) {
      setIsLoggedIn(true); 
      return;
    }
  },[])

  const showLoginAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Akses Terbatas: Mohon Login',
      text: 'Maaf, akses ke fitur ini terbatas hanya untuk pengguna yang sudah login.',
    });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <HeroImage />
      </div>
      <section id="about" className="about" style={{backgroundColor: 'white'}}>
        <div className="container">
          <div className="section-title" style={{textAlign: 'center'}} >
            <h2 className="title">About Us</h2>
          </div>
          <div className="row content">
            <p>Website ini merupakan sebuah aplikasi berbasis WebGIS yang dirancang untuk memberikan informasi terkini mengenai kondisi jalan suatu wilayah, khususnya kondisi jalan provinsi Jawa Barat. 
              Dalam perkembangannya, aplikasi ini memerlukan pembaruan fitur sehingga pengguna dapat melihat kondisi jalan secara visual. 
              Tujuan utama dari aplikasi ini adalah untuk menyajikan model visualisasi peta kondisi jalan provinsi berbasis web untuk menampilkan data secara visual. 
              Dalam hal ini, website ini akan menampilkan data kondisi jalan provinsi Jawa Barat dalam bentuk peta interaktif yang memungkinkan pengguna untuk melihat kondisi jalan pada lokasi tertentu dalam bentuk Foto dan Video yang ditandai dalam peta.
              Dalam pengembangan website ini, kami memastikan bahwa website ini dapat diakses oleh pengguna dari berbagai perangkat, termasuk desktop, laptop, dan perangkat seluler. 
              Selain itu, kami juga memastikan bahwa website ini mudah digunakan dan dapat diakses oleh pengguna dengan berbagai tingkat keahlian teknologi.</p>
            <div className="col-lg-6">
              <a href="/training" className="btn-learn-more">Learn More</a>
            </div>
          </div>

        </div>
      </section>
      <Container>
        <div className='container-title'>
          <h2 className="title">Features</h2>
        </div>
      </Container>
      <Container>
        <Row className="justify-content-md-center">
            <Card className='mx-3 my-5 shadow' >
              <Card.Body>
                <Card.Img variant="top" src={image1} />
                <Card.Title>Peta Kerusakan Jalan</Card.Title>
                <Card.Text>
                Temukan lokasi kerusakan jalan di area Anda dan laporkan kondisinya untuk perbaikan. 
                </Card.Text>
                <Button className='btn'>
                  <Link to='/map' className='btn'>Lihat</Link>
                </Button>
              </Card.Body>
            </Card>
            <Card className='mx-3 my-5 shadow' >
              <Card.Body>
                <Card.Img variant="top" src={image2} />
                <Card.Title>History Kerusakan Jalan</Card.Title>
                <Card.Text>
                  Informasi riwayat kerusakan jalan dan perbaikan yang telah dilakukan. Fitur ini hanya dapat diakses oleh Petugas 
                </Card.Text>
                <Button onClick={() => {
                if (!isLoggedIn) {
                  showLoginAlert();
                } else {
                  navigate('/admin');
                }
              }} 
                class='btn'>
                  Lihat
                  {/* <Link to='/admin' class='btn'>Lihat</Link> */}
                </Button>
              </Card.Body>
            </Card>
        </Row>
      </Container>
      <Footer />
    </>
  );

  
}

export default Home