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
} from '../actions/types';

const initialState = {
  loading: false,
  conversations: [],
  createdConversation: null,
  activeChat: { conversationId: null, participant: null, messages: [] },
  notifications: [],
  error: { msg: null, status: null }
};

export function Chat(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: [...state.activeChat.messages, action.payload]
        },
        loading: false
      };
    case CREATE_CONVERSATION:
      return {
        ...state,
        loading: false,
        createdConversation: action.payload,
        conversations: [action.payload, ...state.conversations],
        error: { msg: null, status: null }
      };
    case GET_CONVERSATION_MESSAGES:
      return {
        ...state,
        loading: false,
        error: { msg: null, status: null },
        activeChat: {
          ...state.activeChat,
          messages: action.payload.reverse()
        }
      };
    case GET_CONVERSATIONS:
      let tempConversations =
        state.createdConversation !== null
          ? [state.createdConversation, ...action.payload]
          : [...action.payload];
      return {
        ...state,
        loading: false,
        conversations: [...tempConversations],
        error: { msg: null, status: null }
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case FORBIDDEN_CONVERSATION:
      return {
        ...state,
        loading: false,
        createdConversation: null,
        activeChat: { conversationId: null, creator: null, participant: null, messages: [] },
        error: { msg: null, status: null }
      };
    case SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        loading: false,
        createdConversation: null,
        activeChat: {
          ...state.activeChat,
          conversationId: action.payload.conversationId,
          participant: action.payload.participant,
          creator: action.payload.creator,
          messages: action.payload.messages
        },
        error: { msg: null, status: null }
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case CHAT_ERROR:
      return {
        ...state,
        loading: false,
        error: { msg: action.payload.msg, status: action.payload.status }
      };
    default:
      return state;
  }
}
