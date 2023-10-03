import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material'

import Register from './pages/Register'
import Login from './pages/Login'
import DrawerAppBar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from './components/layout/Footer';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import jwtDecode from 'jwt-decode'
import PrivateRoute from './components/routes/PrivateRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logOut } from './actions/authActions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
      dark: '#512DA8',
      light: '#D1C4E9',
      text: '##212121',
      accent: '#7C4DFF',
      divider: '#BDBDBD',
    },
    secondary: {
      main: '#00ff00',
      text: '#757575'
    },
  },
});

const App = () => {

  const dispatch = useDispatch();

    if (localStorage.token) {

      const decoded = jwtDecode(localStorage.token)
      const currentTime = Date.now() / 1000
    
      if (decoded.exp < currentTime) { 
        localStorage.removeItem('token')
        setAuthToken(false)
        dispatch(logOut)
      } else {
        setAuthToken(localStorage.token)
        dispatch(loadUser())
      }

    } else {
      // if (window.location.pathname !== '/login') {
      //   <Navigate to={'/login'} />
      // }
    }
    
  return(
    <Router>
      <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DrawerAppBar />
        <Container maxWidth='xl'>
          <Routes>
            <Route exact path='/' element={<Navigate to='dashboard' />} ></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/dashboard' element={<PrivateRoute component={ Dashboard } />}></Route>
          </Routes>
        </Container>
        <Footer />
      </LocalizationProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App;
