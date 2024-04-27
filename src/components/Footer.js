import React from 'react'
import './Footer.css'
import { BiLogoTwitter, BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoGmail, BiPhone, BiMap } from 'react-icons/bi'; 

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-container'>

        {/* left side */}
        <div className='left'>
          <div className='location'>
            <h4><BiMap /> Ilmu Komputer IPB <br/>Jl. Meranti, Wing 20 Level 5 Kampus IPB Dramaga Bogor 16680 </h4>
          </div>
          <div className='phone'>
            <h4><BiPhone /> 0251-8625584</h4>
          </div>
          <div className='email'>
            <h4><BiLogoGmail /> ilkom@apps.ipb.ac.id</h4>
          </div>
        </div>

        {/* Right side */}
        <div className='right'>
          <h4>Sekilas tentang Aplikasi</h4>
          <p>"Temukan informasi terkini tentang kondisi jalan provinsi Jawa Barat melalui aplikasi kami yang memudahkan Anda dalam merencanakan perjalanan dengan aman dan nyaman."
          </p>
        </div>
      </div>
      <div className="social-links">
        <a href="#" className="twitter"><BiLogoTwitter /></a>
        <a href="#" className="facebook"><BiLogoFacebook /></a>
        <a href="#" className="instagram"><BiLogoInstagram /></a>
        <a href="#" className="linkedin"><BiLogoLinkedin /></a>
      </div>
      <div className='copyright'>
        &copy; Copyright <strong><span>Sobat Jabar</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="/about">Sobat Jabar Team</a>
      </div>
    </div>
  )
}

export default Footer