// External Import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

// Internal Import
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

// Style Import
import './style/main.css';
import './style/chat.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
