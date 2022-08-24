import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import SessionStorage from '../libs/SessionStorage';

import rootReducer from '../redux';

let middleware = [
  reduxThunk
];

if ( process.env.NODE_ENV === "development") {
  // Dev-only middleware
  middleware = [
    ...middleware,
    createLogger(), // Logs state changes to the dev console
  ];
}

function loadFromLocalStorage() {
  try {
    const user = SessionStorage.getItem('user');
    if (user) {
      const token = SessionStorage.getItem('token');
      const session = SessionStorage.getItem('session');
      const storeUser = {
        user: {
          user,
          token,
          session,
        },
      }
  
      return storeUser;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}

const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  compose (
    applyMiddleware(...middleware),
  )
);

export default store;

