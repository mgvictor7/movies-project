import { combineReducers } from 'redux';

import movies from './movies/reducer';
import user from './user/reducer';

// Combine all reducers
const appReducer = combineReducers({
  movies,
  user,
});


const rootReducer = (state, action) => {
  if (action.type === 'DESTROY') {
    return appReducer({}, action);
  }
  return appReducer(state, action);
};

export default rootReducer;