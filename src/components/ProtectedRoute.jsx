import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Supposons que vous avez un contexte d'authentification

const ProtectedRoute = ({ children, allowedRoles, requiredStatus }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  if (requiredStatus && user.statut !== requiredStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;