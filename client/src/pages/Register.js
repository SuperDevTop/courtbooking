import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material';

import { registerUser } from '../actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            name,
            email,
            password,
        }

        dispatch(registerUser(newUser, history))
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin='normal'
                required
                sx={{
                    marginTop: 15
                }}
            />
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <Button type='submit' variant='contained' color='primary'>Register</Button>
        </form>
    )
}

export default Register;
