// Internal Import
import {
  GET_USER,
  USER_LOGIN,
  REGISTER_USER,
  LOGOUT_USER,
  LOADING,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('user-token'),
  isAuthenticated: false,
  user: null,
  loading: false,
  error: {
    msg: null,
    status: null
  },
  userDataUpdated: false
};

export const Auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false
      };

    case USER_LOGIN:
    case REGISTER_USER:
      localStorage.setItem('user-token', action.payload.token);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: {
          msg: null,
          status: null
        }
      };
    case LOGOUT_USER:
      localStorage.removeItem('user-token');
      return {
        ...state,
        token: null,
        user: {},
        loading: false,
        isAuthenticated: false,
        error: {
          msg: null,
          status: null
        }
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        userDataUpdated: false,
        error: {
          msg: action.payload.msg,
          status: action.payload.status
        }
      };
    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
