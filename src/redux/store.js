// External Import
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Internal Import
import reducers from './reducers';

const initialState = {};
const middleware = [thunk];

// Initialize Store with reducers and middleware
const Store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

// Get Token from Local Storage
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

// Subscribe to store changes
Store.subscribe(() => {
  const { lastAction, Auth } = Store.getState();
});

// Export Store
export default Store;
