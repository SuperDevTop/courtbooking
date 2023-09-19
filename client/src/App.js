// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material'

import Register from './pages/Register'
import Login from './pages/Login'
import DrawerAppBar from './components/Navbar';
import Dashboard from './pages/dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from './components/Footer';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import jwtDecode from 'jwt-decode'
import PrivateRoute from './components/routes/PrivateRoute';

const App = () => {

  const dispatch = useDispatch();

    if (localStorage.token) {
      setAuthToken(localStorage.token)
      dispatch(loadUser())

      const decoded = jwtDecode(localStorage.token)
      const currentTime = Date.now() / 1000
      
      if (decoded.exp < currentTime) {
        localStorage.removeItem('token')
        setAuthToken(false)
        window.location.href = '/login'
      }
    } else {
      if (window.location.pathname !== '/login') {
        // window.location.href = '/login'
        <Navigate to={'/login'} />
      }
    }
    
  return(
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        {/* {(!hideNavbarRoutes.includes(window.location.pathname)) && !(window.location.pathname === '/') && <DrawerAppBar />} */}
        <DrawerAppBar />

        <Container maxWidth='xl'>
          <Routes>
            <Route exact path='/' element={<Navigate to='login' />} ></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />}></Route>
          </Routes>
        </Container>
        <Footer />
      </LocalizationProvider>
    </Router>
  )
}

export default App;
