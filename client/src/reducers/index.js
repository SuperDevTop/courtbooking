import { combineReducers } from 'redux';
import authReducer from './authReducer';
import playerReducer from './playerReducer'
import pageReducer from './pageReducer';

export default combineReducers({
  auth: authReducer,
  players: playerReducer,
  page: pageReducer
});