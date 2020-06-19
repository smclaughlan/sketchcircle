import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import history from "./utils/history";

const preloadedState = {
  user: {
    token: localStorage.getItem("x-access-token"),
    currentUserId: localStorage.getItem("currentUserId"),
  },
};

const store = configureStore(preloadedState);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
