// External Import
import axios from 'axios';

// Internal Import
import { GET_USER, USER_LOGIN, REGISTER_USER, LOGOUT_USER, LOADING, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:8000/api/v1';

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
  axios
    .get(`${API_URL}/user/`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// User Login
export const userLogin = loginData => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`${API_URL}/auth/login`, loginData)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: USER_LOGIN, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Register User
export const registerUser = registerData => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`${API_URL}/auth/register`, registerData)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: REGISTER_USER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Logout User
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
};
