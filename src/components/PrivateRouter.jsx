import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    };

export default PrivateRoute;