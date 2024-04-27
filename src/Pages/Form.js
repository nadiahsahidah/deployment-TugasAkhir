import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../Pages/Form.css';

const FormLapor = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten_kota, setKabupaten_kota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [date, setDate] = useState("");
  const [macamKerusakan, setMacamkerusakan] = useState("");
  const [perolehanData, setPerolehandata] = useState("");
  const [sebabKerusakan, setSebabkerusakan] = useState("");
  const [panjang_kerusakan, setPanjang_kerusakan] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  
  const handleChangeKerusakan = (e) => {
    setMacamkerusakan(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setPhoto(file);
  };
  
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setVideo(file);
  };

  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   return new Date(dateString).toLocaleDateString('en-US', options);
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(new Date(date), 'MM/dd/yyyy');
    const token = localStorage.getItem('userToken'); 

    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('provinsi', provinsi);
    formData.append('kabupaten_kota', kabupaten_kota);
    formData.append('kecamatan', kecamatan);
    formData.append('desa', desa);
    formData.append('date', formattedDate);
    formData.append('macamKerusakan', macamKerusakan);
    formData.append('perolehanData', perolehanData);
    formData.append('sebabKerusakan', sebabKerusakan);
    formData.append('panjang_kerusakan', panjang_kerusakan);
    formData.append('photo', photo);
    formData.append('video', video);
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data'
      },
    };

    try {
      const response = await axios.post('http://103.178.153.251:3333/history', formData, config);
      console.log(response.data);
      alert('Data successfully submitted!');
      navigate('/map');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data!');
    }
  };

  return (
    <>
    <div>
        <Navbar />
    </div>
    <Form style={{marginTop:"10%"}} onSubmit={handleSubmit}>
      <h2>Laporkan Kerusakan Jalan</h2>
      <InputGroup as={Row} className="mb-3">
        <Col sm="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control type='text' value={latitude} onChange={e => setLatitude(e.target.value)} ></Form.Control>
          <Form.Label>Provinsi</Form.Label>
          <Form.Control type='text' value={provinsi} onChange={e => setProvinsi(e.target.value)} ></Form.Control>
          <Form.Label>Kecamatan</Form.Label>
          <Form.Control type='text' value={kecamatan} onChange={e => setKecamatan(e.target.value)} ></Form.Control>
          <Form.Label>Tanggal</Form.Label>
          <Form.Control type='date' value={date} onChange={e => setDate(e.target.value)} ></Form.Control>
          <Form.Label>Sebab Kerusakan</Form.Label>
          <Form.Control type='text' value={sebabKerusakan} onChange={e => setSebabkerusakan(e.target.value)} ></Form.Control>
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" onChange={handlePhotoChange}></Form.Control>
          <Form.Label>Panjang Kerusakan</Form.Label>
          <Form.Control type='text' value={panjang_kerusakan} onChange={e => setPanjang_kerusakan(e.target.value)} ></Form.Control>
        </Col>
        <Col sm="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control type='text' value={longitude} onChange={e => setLongitude(e.target.value)} ></Form.Control>
          <Form.Label>Kabupaten/Kota</Form.Label>
          <Form.Control type='text' value={kabupaten_kota} onChange={e => setKabupaten_kota(e.target.value)} ></Form.Control>
          <Form.Label>Desa</Form.Label>
          <Form.Control type='text' value={desa} onChange={e => setDesa(e.target.value)} ></Form.Control>
          <Form.Label>Macam Kerusakan</Form.Label>
          <select className="form-select" value={macamKerusakan} onChange={handleChangeKerusakan}>
            <option value="">Pilih</option>
            <option value='Retak'>Retak</option>
            <option value='Lubang'>Lubang</option>
            <option value='Amblas'>Amblas</option>
          </select>
          <Form.Label>Perolehan Data</Form.Label>
          <Form.Control type='text' value={perolehanData} onChange={e => setPerolehandata(e.target.value)} ></Form.Control>
          <Form.Label>Video</Form.Label>
          <Form.Control type="file" onChange={handleVideoChange}></Form.Control>
        </Col>
      </InputGroup>
      <Button variant="login" type="submit">Submit</Button>
    </Form>
    </>
  );
};

export default FormLapor;