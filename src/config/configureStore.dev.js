// redux
import { createStore, applyMiddleware } from 'redux';
import root from './../store/root';
// middlewares
import logger from 'redux-logger';
import thunk from 'redux-thunk';


// NOTE: Create and configure store
// ============================================================================ //
const configureStore = (preloadedState) => createStore(
  root,
  preloadedState,
  applyMiddleware(logger, thunk)
);

export default configureStore;
