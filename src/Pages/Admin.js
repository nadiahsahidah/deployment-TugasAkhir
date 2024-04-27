import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

import './Admin.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Admin = () => {
  const [records, setRecords] = useState([]);
  // const [history, setHistory] = useState([]);
  const [retak, setRetak] = useState(0);
  const [lubang, setLubang] = useState(0);
  const [amblas, setAmblas] = useState(0);
  const [panjangRusak, setPanjangRusak] = useState(0);
  const [sudahDitangani, setSudahDitangani] = useState(0);
  const [belumDitangani, setBelumDitangani] = useState(0);

  const fetchData = async () => {
    const token = localStorage.getItem('userToken');

    if (!token) {
      console.error('User token not found.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };

    try {
      const [responseHistory, responseLocation, responsePenanganan] = await Promise.all([
        axios.get('http://103.178.153.251:3333/history', config),
        axios.get('http://103.178.153.251:3333/location', config),
        axios.get('http://103.178.153.251:3333/penanganan', config)
      ]);

      const historyData = responseHistory.data.data;
      const locationData = responseLocation.data.data;
      const penangananData = responsePenanganan.data.data;

      console.log(historyData)
      console.log(locationData)
      console.log(penangananData)
      const filterNull = locationData.locations.filter(row=>row.panjang_kerusakan !== null)
      let totalRusak = 0
      console.log(filterNull)
      filterNull.map((row)=>{
        totalRusak += parseFloat(row.panjang_kerusakan)
      })
      setPanjangRusak(totalRusak)

      // console.log(historyData.historys)

      // Gabungkan data dari ketiga endpoint
      const combinedData = combineData(historyData.historys, locationData.locations, penangananData.penanganans);
      // console.log(combinedData)
      // Set state 'records' dengan data yang telah digabungkan
      setRecords(combinedData);
      setRetak((historyData.historys.filter(row=>row.macam_kerusakan === "Retak")).length);
      setLubang((historyData.historys.filter(row=>row.macam_kerusakan === "Lubang")).length);
      setAmblas((historyData.historys.filter(row=>row.macam_kerusakan === "Amblas")).length);
      setSudahDitangani((penangananData.penanganans.filter(row=>row.uraian === "sudah ditangani")).length);
      setBelumDitangani((penangananData.penanganans.filter(row=>row.uraian === "belum ditangani")).length);
      

    } catch (error) {
      console.error("Gagal menampilkan data", error);
    }
  };

  const combineData = (history, location, penanganan) => {
    // Create a new array to store the combined data
    const combinedData = [];

    // Iterate over the history data
    location.forEach(locationItem => {
      // Find the matching data from location based on ID
      const matchingLocationAndHistory = history.find(historyItem => locationItem.id === historyItem.location_id);
      // Find the matching data from penanganan based on history ID
      const matchingHistoryAndPenanganan = penanganan.find(penangananItem => matchingLocationAndHistory.id === penangananItem.history_id);

      if (matchingLocationAndHistory && matchingHistoryAndPenanganan) {
        // Combine data into one object
        const combinedItem = {
          location: locationItem,
          history: matchingLocationAndHistory,
          penanganan: matchingHistoryAndPenanganan,
        };
        combinedData.push(combinedItem);
        // console.log(combinedItem.location.desa);
      };
    });
    // Return the combined data
    console.log(combinedData);
    return combinedData;
  };


  useEffect(() => {
    fetchData();
    console.log(retak)
  }, []);

  const customStyles = {
    rows: {
      style: {
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "13px",
        backgroundColor: "#184457",
        textAlign: "center",
        color: "#fff",
      },
    },
    pagination: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const handleEditClick = async (id) => {
    console.log('Editing item with id:', id)
    const token = localStorage.getItem('userToken');

    // Check if the token exists
    if (!token) {
      // Handle the case where the token is not available
      console.error('User token not found.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header
      },
    };

    const findData = records.find((data) => data.penanganan.id === id);
    // benerin disini 
    // const tanggal = yang udah diformat
    const dateObject = new Date(findData.penanganan.date);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('id-ID', options);

    // const formattedDate = format(new Date(findData.penanganan.date), 'd MMMM yyyy');
    await Swal.fire({
      title: "Edit History Kerusakan Jalan",
      html:
        '<h5> Penanganan </h5>' +
        `<select id="uraian" class="swal2-input">
          <option value="sudah ditangani" ${findData.penanganan.uraian === 'sudah ditangani' ? 'selected' : ''}>Sudah Ditangani</option>
          <option value="belum ditangani" ${findData.penanganan.uraian === 'belum ditangani' ? 'selected' : ''}>Belum Ditangani</option>
        </select>` +
        '<h5> Tanggal Penanganan </h5>' +
        `<input id="date" class="swal2-input" type="date" value="${formattedDate}">` +
        '<h5> Biaya </h5>' +
        `<input id="biaya" class="swal2-input" value="${findData.penanganan.biaya}">` +
        '<h5> Cacah </h5>' +
        `<input id="cacah" class="swal2-input" value="${findData.penanganan.cacah}">`,

      showCancelButton: true,
      preConfirm: () => {
        const newPenanganan = document.getElementById("uraian").value;
        const newTanggal = document.getElementById("date").value;
        const newBiaya = document.getElementById("biaya").value;
        const newCacah = document.getElementById("cacah").value;

        if (!newPenanganan || !newTanggal || !newBiaya || !newCacah) {
          Swal.showValidationMessage("Pastikan semua data terisi");
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newPenanganan = document.getElementById("uraian").value;
        const newTanggal = document.getElementById("date").value;
        const newBiaya = document.getElementById("biaya").value;
        const newCacah = document.getElementById("cacah").value;

        try {
          const response = await axios.put(`http://103.178.153.251:3333/penanganan/${id}`, {
           // harus sama dengan atribut backend
            uraian: newPenanganan,
            date: newTanggal,
            biaya: newBiaya,
            cacah: newCacah,
          }, config);
          fetchData();
          console.log(response);
          Swal.fire("Berhasil tersimpan", "", "success");
        } catch (error) {
          console.log("Gagal menyimpan data", error);
          Swal.fire("Gagal menyimpan data", "", error);
        }

      }
    });
  }

  // const handleDeleteClick = (id) => {
  //   Swal.fire({
  //     title: `Apakah anda yakin ingin menghapus?`,
  //     text: "Anda tidak bisa membatalkan penghapusan!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya, Hapus!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(`http://103.178.153.251:3333/penanganan${id}`).then(() => {
  //         fetchData();
  //       });
  //       Swal.fire({
  //         title: "Berhasil!",
  //         text: "History berhasil dihapus.",
  //         icon: "success",
  //       });
  //     }
  //   });
  //   console.log(id);
  // };


  const columns = [
    {
      name: 'Kabupaten',
      selector: (row) => row.location.kabupaten_kota,
      sortable: true,
    },
    {
      name: 'Kecamatan',
      selector: (row) => row.location.kecamatan,
      sortable: true,
    },
    {
      name: 'Desa',
      selector: (row) => row.location.desa,
      sortable: true,
    },
    {
      name: 'Macam Kerusakan',
      selector: (row) => row.history.macam_kerusakan,
      sortable: true,
    },
    {
      name: 'Sebab Kerusakan',
      selector: (row) => row.history.sebab_kerusakan,
      sortable: true,
    },
    {
      name: 'Panjang Kerusakan (m)',
      selector: (row) => row.location.panjang_kerusakan,
      sortable: true,
    },
    {
      name: 'Perolehan Data',
      selector: (row) => row.history.perolehan_data,
      sortable: true,
    },
    {
      name: 'Penanganan',
      selector: (row) => row.penanganan.uraian,
      sortable: true,
    },
    {
      name: 'Tanggal Penanganan',
      selector: (row) => {
        const tanggal = row.penanganan.date
        const dateObject = new Date(tanggal);

        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('id-ID', options);
        // const formattedDate = format(new Date(tanggal), 'dd/MM/yyyy');
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (d) => [
        // <Button onClick={() => console.log(d.penanganan.penangananItem)}>Edit</Button>,
        <Button key={d.penanganan.id} onClick={() => { handleEditClick(d.penanganan.id) }} type='button' className='btn-edit'>
          Edit
        </Button>,
        // <Button key={d.id} onClick={() => {handleDeleteClick(d.id)}} type='button' className='btn-delete'>
        //   Hapus
        // </Button>,
      ]
    }
  ];

  const chartData = [
    { name: 'Amblas', value: amblas },
    { name: 'Retak', value: retak },
    { name: 'Lubang', value: lubang }
  ];

  const chartData2 = [
    { name: 'belum ditangani', value: belumDitangani },
    { name: 'sudah ditangani', value: sudahDitangani },
  ];


  const COLORS = ['#B21F00', '#2FDE00', '#00A6B4'];


  // function handleFilter(e) {
  //   const newData = history.filter((row) => {
  //     return row.username.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   setRecords(newData);
  // }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <div style={{ marginRight: '20px' }}>
          <PieChart width={300} height={350}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="70%" outerRadius={80} fill="#8884d8">
              {
                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <Card style={{marginTop: "120px", width: "250px"}}>
          <Card.Body>
            <h1 style={{textAlign:"left", paddingTop: "30px"}}>{panjangRusak}</h1>
            <h6 style={{textAlign:"left"}}>Total Panjang Jalan Rusak (m)</h6>
          </Card.Body>
        </Card>
        <div>
          <PieChart width={300} height={350} style = {{marginLeft: "40px"}}>
            <Pie data={chartData2} dataKey="value" nameKey="name" cx="50%" cy="70%" outerRadius={80} fill="#8884d8">
              {
                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div className="px-4 auto container">
        {/* <div class="input-group mb-3">
          <input
            class="form-control me-2" aria-label="search"
            type="text"
            placeholder="Cari"
            onChange={handleFilter}
          />
        </div> */}
        <DataTable
          columns={columns}
          data={records}
          fixedHeader
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
      <Footer />
    </>
  );
}

export default Admin