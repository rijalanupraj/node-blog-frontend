// External Import
import { combineReducers } from 'redux';

// Internal Import
import { Auth } from './authReducer';

function lastAction(state = null, action) {
  return action.type;
}

// Combine All Reducers into One
const reducers = combineReducers({
  Auth,
  lastAction
});

export default reducers;
