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
export const addComment = (postId, text) => dispatch => {
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

// Update Comment
export const updateComment = (commentId, text) => dispatch => {
  dispatch({ type: LOADING });

  API.put(`comment/${commentId}`, { text }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: UPDATE_COMMENT,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch({ type: LOADING });

  API.delete(`comment/post/${postId}/${commentId}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          commentId: commentId
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
