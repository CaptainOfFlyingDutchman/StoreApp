import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import getRootReducer from './reducer';

export default function getStore(navReducer) {
  return createStore(
    getRootReducer(navReducer),
    undefined,
    applyMiddleware(thunk)
  );
}
