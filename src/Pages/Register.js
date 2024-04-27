import React, { useState } from 'react';
import axios from 'axios';
import '../Pages/Register.css'
import Navbar from '../components/Navbar'

const Register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nomor, setNomor] = useState('');
  const [job, setJob] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://103.178.153.251:3333/register', {
        nama,
        email,
        password,
        nomor,
        job
      });

      // Handle response from backend
      console.log('Response:', response.data);

      // Set token or user data in state/localStorage if needed
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Register failed. Please try again later.');
      }
      console.error('Register Error:', error);
    }
  };

  return (
    <>
    <div className='navbar'>
        <Navbar />
    </div>
    <div className='register-form'>
      <h2>Buat Akun Sobat Jabar</h2>
      <form onSubmit={handleSubmit}>
        <h4>Nama Lengkap</h4>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        //   required
        />
        <h4>Email</h4>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h4>Password</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <h4>Nomor Telepon</h4>
        <input
          type="text"
          value={nomor}
          onChange={(e) => setNomor(e.target.value)}
        //   required
        />
        <h4>Pekerjaan</h4>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        //   required
        />
        <button type="submit">REGISTER</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </>
  );
};


export default Register;
