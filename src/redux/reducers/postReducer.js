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
  DELETE_COMMENT,
  CREATE_POST,
  GET_TIMELINE_POSTS,
  GET_MY_POSTS,
  DELETE_POST,
  UPDATE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  error: { msg: null, status: null },
  loading: false,
  createdPost: {},
  updatedPost: {},
  timelinePosts: [],
  myPosts: []
};

export const Post = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
        createdPost: {},
        updatedPost: {}
      };
    case GET_POST_BY_SLUG:
      return {
        ...state,
        post: action.payload.post,
        loading: false,
        createdPost: {},
        updatedPost: {}
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          msg: action.payload.msg,
          status: action.payload.status
        },
        createdPost: {},
        updatedPost: {}
      };
    case POST_LOADING:
      return {
        ...state,
        error: { msg: null, status: null },
        loading: true
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload.comment],
          loading: false,
          error: { msg: null, status: null }
        },
        createdPost: {},
        updatedPost: {}
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
          error: { msg: null, status: null },
          createdPost: {},
          updatedPost: {}
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
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        posts: [action.payload.post, ...state.posts],
        createdPost: action.payload.post,
        updatedPost: {}
      };
    case GET_TIMELINE_POSTS:
      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        timelinePosts: action.payload.posts || [],
        updatedPost: {}
      };
    case GET_MY_POSTS:
      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        myPosts: action.payload.posts || [],
        updatedPost: {}
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        myPosts: state.myPosts.filter(post => post._id !== action.payload.postId)
      };
    case UPDATE_POST:
      const postIndex = state.myPosts.findIndex(post => post._id === action.payload.postId);

      const updatedPosts = [...state.myPosts];

      updatedPosts[postIndex] = action.payload.updatedPost;

      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        myPosts: updatedPosts,
        updatedPost: action.payload.updatedPost
      };

    default:
      return state;
  }
};
