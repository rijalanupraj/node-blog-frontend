// Internal Import
import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, LOADING, POST_COMMENT_ERROR } from './types';
import API from '../../api/api';

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

// Add Comment
export const addComment = (text, postId) => dispatch => {
  dispatch({ type: LOADING });

  API.post(`comment/post/${postId}`, { text }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: ADD_COMMENT,
        payload: {
          comment: data.comment
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_COMMENT_ERROR,
        payload: {
          message: err.response.data.message,
          status: err.response.status
        }
      });
    });
};
