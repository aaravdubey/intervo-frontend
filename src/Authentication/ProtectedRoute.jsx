import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import Loading from '../components/loader.jsx';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authToken, loading } = useAuth();

  if (loading) {
    return <Loading />; // Show loading spinner or something similar
  }

  // Return the component if authenticated or redirect to login
  return authToken ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
