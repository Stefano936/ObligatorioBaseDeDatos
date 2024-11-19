import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  console.log('Usuario autenticado en ProtectedRoute:', user);

  // Verificar si el usuario está autenticado
  if (!user) {
    return <Navigate to="/login" />;
  } 

  if (user.correo == "admin@correo.com") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
