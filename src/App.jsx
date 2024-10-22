import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./components/EmployeesList";
import AttendanceList from "./components/AttendanceList";
import LeaveList from "./components/LeaveList";
import ReviewList from "./components/ReviewList";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto"; // MUI font
import theme from "./theme";
import ProfilePage from "./components/Profile";
import PrivateRoute from "./components/PrivateRouter";

// Import the particles.js code
import { useEffect, useState } from "react";
import { tsParticles } from "https://cdn.jsdelivr.net/npm/tsparticles-engine@2/+esm";
import { loadFull } from "https://cdn.jsdelivr.net/npm/tsparticles@2/+esm";

async function loadParticles(options) {
  await loadFull(tsParticles);
  await tsParticles.load(options);
}

const baseEmitterConfig = (direction, position) => {
  return {
    direction,
    rate: {
      quantity: 15,
      delay: 0.3,
    },
    size: {
      width: 0,
      height: 0,
    },
    spawnColor: {
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          offset: {
            min: -1.4,
            max: 1.4,
          },
          speed: 2,
          sync: false,
        },
        l: {
          enable: true,
          offset: {
            min: 40,
            max: 60,
          },
          speed: 0,
          sync: false,
        },
      },
    },
    position,
  };
};

const configs = {
  background: {
    color: "#000",
  },
  particles: {
    angle: {
      value: 0,
      offset: 30,
    },
    move: {
      enable: true,
      outModes: {
        top: "none",
        default: "destroy",
      },
      gravity: {
        enable: true,
      },
      speed: { min: 5, max: 20 },
      decay: 0.01,
    },
    number: {
      value: 0,
      limit: 300,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    size: {
      value: { min: 2, max: 5 },
      animation: {
        count: 1,
        startValue: "min",
        enable: true,
        speed: 5,
        sync: true,
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: "random",
      animation: {
        enable: true,
        speed: 60,
      },
    },
    tilt: {
      direction: "random",
      enable: true,
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
    },
    roll: {
      darken: {
        enable: true,
        value: 25,
      },
      enable: true,
      speed: {
        min: 15,
        max: 25,
      },
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  emitters: [
    baseEmitterConfig("top-right", { x: 0, y: 30 }),
    baseEmitterConfig("top-left", { x: 100, y: 0 }),
  ],
};

// App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    loadParticles(configs); // Load particles on component mount
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkLoginStatus(); // Check on component mount

    // Add event listener to detect changes in localStorage
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container relative">
        {/* Particles Canvas as Background */}
        <div
          id="tsparticles"
          className="fixed top-0 left-0 w-full h-full z-0"
        ></div>

        {/* Foreground Content */}
        <Router>
          <Navbar />
          <div className="main-content container mx-auto p-4 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Protect these routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <EmployeeList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <AttendanceList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/leaves"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <LeaveList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ReviewList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
                }
              />

              <Route
                path="/register"
                element={<Register setIsLoggedIn={setIsLoggedIn} />}
              />

            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
