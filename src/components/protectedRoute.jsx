import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../services/authService';
import PropTypes from 'prop-types';
import {logout} from '../services/authService';

// A wrapper to protect routes that require authentication
const ProtectedRoute = ({ element }) => {
  if (!isTokenValid()) {
    logout();
    return <Navigate to="/login" />;
  }
  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
