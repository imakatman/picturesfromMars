// Polyfills for IE >= 8
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'array.prototype.fill';
import 'dialog-polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
