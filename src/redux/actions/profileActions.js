// Internal Import
import { LOADING, PROFILE_ERROR, FETCH_PROFILE, FETCH_PROFILE_POSTS } from './types';
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

// Fetch Profile User From username
export const fetchUserProfileByUsername = username => dispatch => {
  API.get(`/user/username/${username}`)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: FETCH_PROFILE, payload: data });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// Fetch All Public post of a user
export const fetchUserPublicPost = username => dispatch => {
  API.get(`/post/profile/${username}`)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: FETCH_PROFILE_POSTS, payload: data });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};
