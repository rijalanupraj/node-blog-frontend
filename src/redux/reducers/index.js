// External Import
import { combineReducers } from 'redux';

// Internal Import
import { Auth } from './authReducer';
import { Post } from './postReducer';
import { Profile } from './profileReducer';
import { Chat } from './chatReducer';

function lastAction(state = null, action) {
  return action.type;
}

// Combine All Reducers into One
const reducers = combineReducers({
  Auth,
  Post,
  Profile,
  Chat,
  lastAction
});

export default reducers;
