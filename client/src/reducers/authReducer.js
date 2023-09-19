import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOAD, LOG_OUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: null,
  credential: '',
  loading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTER_SUCCESS:
      return {
          ...state
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        loading : false
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        credential: action.payload.error
      }
    
    case USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading : false
      }

    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loading : false
      }

    default:
      return state;
  }
};

export default authReducer;