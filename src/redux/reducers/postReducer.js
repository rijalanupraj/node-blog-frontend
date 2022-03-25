// Internal Import
import { act } from 'react-dom/test-utils';
import {
  POST_ERROR,
  POST_LOADING,
  GET_POST_BY_ID,
  GET_POST_BY_SLUG,
  GET_ALL_POSTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
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

    case ADD_COMMENT:
      console.log(action.payload.comment);
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload.comment],
          loading: false,
          error: { msg: null, status: null }
        }
      };
    case UPDATE_COMMENT:
      const commentIndex = state.post.comments.findIndex(
        comment => comment._id === action.payload.comment._id
      );
      const updatedComments = [...state.post.comments];

      updatedComments[commentIndex] = action.payload.comment;

      return {
        ...state,
        post: {
          ...state.post,
          comments: updatedComments,
          loading: false,
          error: { msg: null, status: null }
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== action.payload.commentId),
          loading: false,
          error: { msg: null, status: null }
        }
      };

    default:
      return state;
  }
};
