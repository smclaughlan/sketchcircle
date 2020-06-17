import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const preloadedState = {
  user: {
    token: localStorage.getItem("x-access-token"),
    currentUserId: localStorage.getItem("currentUserId"),
  }
};

const store = configureStore(preloadedState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
