import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/rootReducers';

/**
 * @function logger
 * @param {*} store
 * @returns {js} actions
 */
const logger = store => next => (action) => {
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  console.log('[Middleware] next state', store.getState());
  return result;
};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(logger, thunk))
);

export default store;
