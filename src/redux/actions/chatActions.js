// External Import
import axios from 'axios';

// Internal Import
import {
  RECEIVE_MESSAGE,
  CREATE_CONVERSATION,
  GET_CONVERSATIONS,
  SET_ACTIVE_CONVERSATION,
  CHAT_ERROR,
  FORBIDDEN_CONVERSATION,
  GET_CONVERSATION_MESSAGES,
  GET_NOTIFICATIONS,
  LOADING
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

export const createConversation = participantId => dispatch => {
  dispatch({ type: LOADING });

  API.post(`/chat/create`, { participantId }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      let conversationObject = { conversation: data.conversation, lastMessage: null };
      dispatch({ type: CREATE_CONVERSATION, payload: conversationObject });
    })
    .catch(err => {
      dispatch({
        type: CHAT_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const getConversations = () => dispatch => {
  dispatch({ type: LOADING });

  API.get(`/chat/conversations`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_CONVERSATIONS, payload: data.conversations });
    })
    .catch(err => {
      dispatch({
        type: CHAT_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const setActiveConversation = (conversationId, participant, creator) => dispatch => {
  dispatch({ type: LOADING });

  API.get(`/chat/messages/${conversationId}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: SET_ACTIVE_CONVERSATION,
        payload: { conversationId, participant, creator, messages: data.messages }
      });
    })
    .catch(err => {
      dispatch({
        type: CHAT_ERROR,
        payload: {
          msg: err.response.data,
          status: err.response.status
        }
      });
    });
};

export const receiveMessage = message => {
  return { type: RECEIVE_MESSAGE, payload: message };
};

export const forbiddenConversation = () => {
  return { type: FORBIDDEN_CONVERSATION };
};

export const getConversationMessages = conversationId => dispatch => {
  dispatch({ type: LOADING });

  API.get(`/chat/messages/${conversationId}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_CONVERSATION_MESSAGES, payload: data.messages });
    })
    .catch(err => {
      dispatch({
        type: CHAT_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};

export const getNotifications = () => dispatch => {
  API.get(`/chat/unseen/messages`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_NOTIFICATIONS, payload: data.messages });
    })
    .catch(err => {
      dispatch({
        type: CHAT_ERROR,
        payload: {
          msg: err.response.data.message,
          status: err.response.status
        }
      });
    });
};
