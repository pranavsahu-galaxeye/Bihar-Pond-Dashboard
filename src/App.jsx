import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map/MapComponent";
import Sidebar from "./components/Sidebar/Sidebar";
import SignIn from "./components/Authentication/SignIn";
import {
  AuthProvider,
  AuthContext,
} from "./components/Authentication/AuthContext";
import logo from "../public/galaxeye-white.png"; // Update the path based on your directory structure
// import "./App.css";

const App = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchGeojson = async () => {
      try {
        const response = await fetch("/BIHAR_PONDS_MERGED_POINT.geojson");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch GeoJSON data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeojson();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  component={Dashboard}
                  geojsonData={geojsonData}
                />
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

const Dashboard = ({ geojsonData }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex items-center justify-between absolute top-2.5 left-1/2 transform -translate-x-1/2 w-[calc(100%-25px)] px-2 py-2.5 rounded-2xl bg-gradient-to-r from-[#121212] via-[#09302E] to-[#053C3A] shadow-md z-10">
        <img src={logo} alt="Company Logo" className="h-[51px]  " />
        <div className="text-white text-2xl font-bold text-center animate-title">
          {" "}
        </div>
        <button
          className="bg-transparent text-white  px-5 py-2 rounded-full text-sm ml-auto hover:bg-[#14DFAF] transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        <Map />
        <Sidebar geojsonData={geojsonData} />
      </div>
    </>
  );
};

Dashboard.propTypes = {
  geojsonData: PropTypes.object,
};

const ProtectedRoute = ({ component: Component, geojsonData, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Component geojsonData={geojsonData} {...rest} />
  ) : (
    <SignIn />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  geojsonData: PropTypes.object,
};

export default App;
