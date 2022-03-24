// Internal Import
import { GET_USER, USER_LOGIN, REGISTER_USER, LOGOUT_USER, LOADING, AUTH_ERROR } from './types';
import API from '../../api/api';

// Loading
export const loading = () => dispatch => {
  dispatch({ type: LOADING });
};

// GET User Token from the local storage
const tokenConfig = () => {
  const token = localStorage.getItem('user-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

// Get User Data
export const getUser = () => dispatch => {
  dispatch({ type: LOADING });
  API.get(`user`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// User Login
export const userLogin = loginData => dispatch => {
  dispatch({ type: LOADING });
  API.post(`/auth/login`, loginData)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: USER_LOGIN, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// Register User
export const registerUser = registerData => dispatch => {
  dispatch({ type: LOADING });
  API.post(`/auth/register`, registerData)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: REGISTER_USER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// Logout User
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
};
