import MapPage from "../src/MapPage/MapPage.jsx"
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import About from "./Pages/About.js";
import FormLapor from "./Pages/Form.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Admin from "./Pages/Admin.js";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/training' element={<About />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/form' element={<FormLapor />} />
        <Route path='/loginApp' element={<Login />} />
        <Route path='/signUp' element={<Register/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
