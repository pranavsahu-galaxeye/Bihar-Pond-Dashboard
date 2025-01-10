import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" />;
};

// Add PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a React node and required
};

export default PrivateRoute;
