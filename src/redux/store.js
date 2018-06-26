import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import preloadedState from './preloadedState';

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

function configureStore () {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
}

let store = configureStore();

export default store;