import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../services/authService';

// A wrapper to protect routes that require authentication
const ProtectedRoute = ({ element }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
