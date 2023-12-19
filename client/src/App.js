import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";

import Register from "./pages/register";
import Login from "./pages/login";
import DrawerAppBar from "./components/layout/navbar";
import Dashboard from "./pages/dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Footer from "./components/layout/footer";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import jwtDecode from "jwt-decode";
import PrivateRoute from "./components/routes/privateRoute";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logOut } from "./actions/authActions";
import ThemeProvider from "./theme/ThemeProvider";
import ApplicationsMessenger from "./components/chat";
import { initiateSocketConnection } from "./utils/socketService";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#673AB7',
//       dark: '#512DA8',
//       light: '#D1C4E9',
//       text: '##212121',
//       accent: '#7C4DFF',
//       divider: '#BDBDBD',
//       info: '#3f055d',
//     },
//     secondary: {
//       main: '#00ff00',
//       text: '#757575'
//     },
//   },
// });

const App = () => {
  const dispatch = useDispatch();

  if (localStorage.token) {
    const decoded = jwtDecode(localStorage.token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {  // auto logout
      localStorage.removeItem("token");
      setAuthToken(false);
      dispatch(logOut);
    } else {
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      initiateSocketConnection();
    }
  }, []);

  return (
    <Router>
      <ThemeProvider>
        {/* <ThemeProvider theme={theme}> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DrawerAppBar />
          <Container
            maxWidth="1536"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to="dashboard" />}
              ></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route
                exact
                path="/dashboard"
                element={<PrivateRoute component={Dashboard} />}
              ></Route>
              <Route
                exact
                path="/Messages"
                element={<PrivateRoute component={ApplicationsMessenger} />}
              ></Route>
            </Routes>
          </Container>
          <Footer />
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
