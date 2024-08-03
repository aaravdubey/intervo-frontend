import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/'); // Redirect to login if no token is found
        } else {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Failed to fetch auth token:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthToken();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Make sure to export AuthContext as a named export
export { AuthContext };
