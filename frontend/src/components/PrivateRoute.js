import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
