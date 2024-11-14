import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Activities from './Pages/Activities';
import Alumnos from './Pages/Alumnos';
import Instructores from './Pages/Instructores';
import Equipamiento from './Pages/Equipamiento';
import Horarios from './Pages/Horarios';
import Clases from './Pages/Clases';
import Actividades from './Pages/Actividades';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/> // Redirect to Login
        <Route path="/login" element={<Login />} /> // Login page
        <Route path="/register" element={<Register />} /> // Register page
        <Route path="/inscripciones" element={<Activities />} /> // Activities page
        <Route path="/actividades" element={<Actividades />} /> // Accede solo admin para modidficar esto
        <Route path="/alumnos" element={<Alumnos />} /> // Accede solo admin para modificar eso
        <Route path="/instructores" element={<Instructores />} /> // Accede solo admin para modificar eso
        <Route path="/equipamiento" element={<Equipamiento />} /> // Accede solo admin para modificar eso
        <Route path="/horarios" element={<Horarios />} /> // Accede solo admin para modificar eso
        <Route path="/clases" element={<Clases />} /> // Accede solo admin para modificar eso
      </Routes>
    </Router>
  );
}

export default App;