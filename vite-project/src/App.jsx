import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Activities from './Pages/Activities';
import Alumnos from './Pages/Alumnos';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/alumnos" element={<Alumnos />} />
      </Routes>
    </Router>
  );
}

export default App;