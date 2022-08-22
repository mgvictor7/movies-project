import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

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

const store = createStore(
  rootReducer,
  compose (
    applyMiddleware(...middleware),
  )
);

export default store;

