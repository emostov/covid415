import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

import mapboxgl from 'mapbox-gl';

import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/session_api_util';


import { logout } from './actions/session_actions';
import { fetchTasks, updateTask } from './actions/task_actions';
import { receiveDisplayAssignedTasks } from './actions/displayed_tasks_actions';

mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN';


document.addEventListener('DOMContentLoaded', () => {

  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    // jwt_decode parses users session token
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session:
        { isAuthenticated: true, user: decodedUser }
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      // window.location.href = '/login'; // TODO might change to no redirect
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.fetchTasks = fetchTasks;
  // window.updateTask = updateTask;
  // window.receiveDisplayAssignedTasks = receiveDisplayAssignedTasks;

  window.task = {
    "deliveryLatLong": [
      37.779283,
      -122.4192478
    ],
    "volunteer": null,
    "status": 0,
    "updatedAt": null,
    "_id": "5e7034941d6feb36aea52c10",
    "type": "other",
    "details": "Please go give London Breed a high five for me!",
    "requester": "5e6fd6126fc9d608d7794f8a",
    "deliveryAddress": "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102",
    "deliveryInstructions": "Leave by the front door",
    "createdAt": "2020-03-17T02:23:16.306Z",
    "__v": 0
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});