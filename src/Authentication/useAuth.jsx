import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx'; // Use named import

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
