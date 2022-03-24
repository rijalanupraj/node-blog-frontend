// External Import
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Internal Import
import reducers from './reducers';

const initialState = {};
const middleware = [thunk];

// For React Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initialize Store with reducers and middleware
const Store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

// Export Store
export default Store;
