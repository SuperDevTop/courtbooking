import axios from 'axios'
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAILURE, USER_LOAD, LOG_OUT } from './types';
const url = "http://localhost:5000";
// const url = "https://courtbooking.vercel.app";

export const registerUser = (user, history) => async(dispatch) => {
    try {
        await axios.post(url + '/api/auth/register', user);
        
        dispatch(
            {
                type : REGISTER_SUCCESS
            }
        )

        history('/login');
        
    } catch(err) {
        console.log(err);
    }
};

export const loginUser = (user, history) => (dispatch) => {
    
        axios.post(url + '/api/auth/login', user)
        .then((res) =>
            {
                const { token } = res.data;
            
                dispatch(
                    {
                        type: LOGIN_SUCCESS,
                        payload: { token }
                    }
                )

                localStorage.setItem('token', token);
                history('/dashboard')

            }
        ).catch((err) => {
            let error = '';

            if(err.response === undefined ) {   // Server error
                error = err.message
            } else {
                error = err.response.data.message
            }

            dispatch (
                {
                    type: LOGIN_FAILURE,
                    payload: { error }
                }
            )
        })

    };

export const loadUser = () => async(dispatch) => {
    dispatch({
        type : USER_LOAD
    })
}

export const logOut = (history) => async(dispatch) => {
    dispatch({
        type: LOG_OUT
    })

    history('/login');
}