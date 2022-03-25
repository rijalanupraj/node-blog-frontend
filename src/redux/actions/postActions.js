// Internal Import
import {
  POST_ERROR,
  POST_LOADING,
  GET_POST_BY_ID,
  CREATE_POST,
  GET_POST_BY_SLUG,
  GET_ALL_POSTS,
  GET_TIMELINE_POSTS,
  GET_MY_POSTS,
  DELETE_POST
} from './types';
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

export const postLoading = () => {
  return { type: POST_LOADING };
};

export const getAllPosts = () => dispatch => {
  dispatch({ type: POST_LOADING });

  API.get(`/post/`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: {
          posts: data.posts
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const getPostBySlug = slug => dispatch => {
  dispatch({ type: POST_LOADING });

  API.get(`/post/slug/${slug}`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      dispatch({
        type: GET_POST_BY_SLUG,
        payload: {
          post: data.post
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// Add New Post
export const createPost = data => dispatch => {
  dispatch({ type: POST_LOADING });

  API.post(`/post`, data, {
    headers: {
      ...tokenConfig().headers,
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => res.data)
    .then(data => {
      dispatch({ type: CREATE_POST, payload: data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const getTimelinePosts = () => dispatch => {
  dispatch({ type: POST_LOADING });

  API.get(`/post/user/timeline`, tokenConfig())
    .then(res => {
      return res.data;
    })
    .then(data => {
      dispatch({
        type: GET_TIMELINE_POSTS,
        payload: {
          posts: data.posts[0]
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const getMyPosts = () => dispatch => {
  dispatch({ type: POST_LOADING });

  API.get(`/post/user/my`, tokenConfig())
    .then(res => {
      return res.data;
    })
    .then(data => {
      dispatch({
        type: GET_MY_POSTS,
        payload: {
          posts: data.posts
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

// Delete Post
export const deletePost = postId => dispatch => {
  dispatch({ type: POST_LOADING });

  API.delete(`/post/${postId}`, tokenConfig())
    .then(res => {
      return res.data;
    })
    .then(data => {
      dispatch({
        type: DELETE_POST,
        payload: {
          postId
        }
      });
    })
    .catch(err => {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};
