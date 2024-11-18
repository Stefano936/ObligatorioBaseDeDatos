import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Activities from './Pages/Activities';
import Alumnos from './Pages/Alumnos';
import Instructores from './Pages/Instructores';
import Equipamiento from './Pages/Equipamiento';
import Horarios from './Pages/Horarios';
import Clases from './Pages/Clases';
import Actividades from './Pages/Actividades';
import Alumnoclase from './Pages/Alumnoclase';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider } from './UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inscripciones" element={<Activities />} />

          {/* Rutas protegidas */}
          <Route
            path="/actividades"
            element={
              <ProtectedRoute>
                <Actividades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumnos"
            element={
              <ProtectedRoute>
                <Alumnos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructores"
            element={
              <ProtectedRoute>
                <Instructores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipamiento"
            element={
              <ProtectedRoute>
                <Equipamiento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/horarios"
            element={
              <ProtectedRoute>
                <Horarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clases"
            element={
              <ProtectedRoute>
                <Clases />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumnosclase"
            element={
              <ProtectedRoute>
                <Alumnoclase />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;