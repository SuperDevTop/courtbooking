import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, FormHelperText, Avatar, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';

import { loginUser } from '../actions/authActions';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Court Booking
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Login = (props) => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const credential = props.credential;
    const inputRef = useRef(null);

    if (props.isAuthenticated) {
      window.location.href = '/dashboard'
    }

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleLogin = () => {
        const user = {
            email,
            password
        }

        props.LoginUser(user, history)
    }

    return(
          <Grid component="main">
            <CssBaseline />
            <Grid item xs={12} sm={8} md={3} margin={'auto'} maxWidth={'500px'} elevation={6} square component={Paper}>
              <Box
                sx={{
                  mt: 18,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 2,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                  Sign in
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        inputRef={inputRef}
                    />               
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        focused
                    />
                    <FormHelperText error>
                      {credential}
                    </FormHelperText>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                    <Button onClick={handleLogin} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2, fontSize:16, py:1 }}>
                        Log in
                    </Button>
                </form>
                <Copyright />
              </Box>
            </Grid>
          </Grid>
    )
}

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (user, history) => dispatch(loginUser(user, history))
})

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    credential: state.auth.credential
})

export default connect(mapStateToProps, mapDispatchToProps)( Login );
