import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import preloadedState from './preloadedState';
import { screenSpecs } from './ducks/screenSpecs';
import { userChosen } from './ducks/userChooses';
import { rovers } from './ducks/apiManifest';
import { pictures } from './ducks/apiPictures';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const roversApp = combineReducers({
  userChosen,
  screenSpecs,
  rovers,
  pictures
})

function configureStore() {
  return createStore(
    roversApp,
    preloadedState,
    applyMiddleware(...middleware)
  );
}

let store = configureStore();

export default store;