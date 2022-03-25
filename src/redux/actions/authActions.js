// Internal Import
import {
  GET_USER,
  USER_LOGIN,
  REGISTER_USER,
  LOGOUT_USER,
  LOADING,
  FOLLOW_USER,
  UNFOLLOW_USER,
  AUTH_ERROR
} from './types';
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
          msg: '',
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

// Follow User
export const followUser = userId => dispatch => {
  dispatch({ type: LOADING });
  API.put(`/user/${userId}/follow`, {}, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: FOLLOW_USER, payload: { userId } });
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

// UnFollow User
export const unFollowUser = userId => dispatch => {
  dispatch({ type: LOADING });
  API.put(`/user/${userId}/unfollow`, {}, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: UNFOLLOW_USER, payload: { userId: userId } });
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
