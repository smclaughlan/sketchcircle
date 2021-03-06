import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import history from "./utils/history";
import openSocket from 'socket.io-client';
import { apiBaseUrl, localBaseUrl, gAnalytics } from './config';

// import ReactGA from 'react-ga';

// ReactGA.initialize(`${gAnalytics}`);
// ReactGA.pageview(window.location.pathname + window.location.search);

// const socket = openSocket(`${localBaseUrl}`);
// socket.on('error', (error) => {
//   console.error(error);
// });

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
      {/* <App socket={socket} /> */}
    </Provider>
  </Router>,
  document.getElementById('root')
);
