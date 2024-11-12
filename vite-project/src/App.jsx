import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Activities from './Pages/Activities';
import Alumnos from './Pages/Alumnos';
import Instructores from './Pages/Instructores';
import Equipamiento from './Pages/Equipamiento';
import Horarios from './Pages/Horarios';
import Clases from './Pages/Clases';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inscripciones" element={<Activities />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/instructores" element={<Instructores />} />
        <Route path="/equipamiento" element={<Equipamiento />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/clases" element={<Clases />} />
      </Routes>
    </Router>
  );
}

export default App;