// Internal Import
import { act } from 'react-dom/test-utils';
import {
  POST_ERROR,
  POST_LOADING,
  GET_POST_BY_ID,
  GET_POST_BY_SLUG,
  GET_ALL_POSTS
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  error: { msg: null, status: null },
  loading: false
};

export const Post = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false
      };
    case GET_POST_BY_SLUG:
      return {
        ...state,
        post: action.payload.post,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          msg: action.payload.msg,
          status: action.payload.status
        }
      };
    case POST_LOADING:
      return {
        ...state,
        error: { msg: null, status: null },
        loading: true
      };

    default:
      return state;
  }
};
