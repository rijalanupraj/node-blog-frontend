import { LOADING, PROFILE_ERROR, FETCH_PROFILE, FETCH_PROFILE_POSTS } from '../actions/types';

const initialState = {
  loading: false,
  error: {
    msg: null,
    status: null
  },
  profile: {},
  posts: []
};

export const Profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          msg: action.payload.message,
          status: action.payload.status
        }
      };
    case LOADING:
      return { ...state, loading: true };

    case FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload.user,
        loading: false,
        error: {
          msg: action.payload.message,
          status: action.payload.status
        }
      };

    case FETCH_PROFILE_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        error: {
          msg: action.payload.message,
          status: action.payload.status
        }
      };

    default:
      return state;
  }
};
