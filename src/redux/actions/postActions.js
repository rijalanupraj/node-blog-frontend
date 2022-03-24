// Internal Import
import { POST_ERROR, POST_LOADING, GET_POST_BY_ID, GET_POST_BY_SLUG, GET_ALL_POSTS } from './types';
import API from '../../api/api';

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
      console.log(data);
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
