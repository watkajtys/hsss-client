import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from  'react-redux';
import store from './components/shared/store.js';
import App from './components/App';

require('./css/style.css');

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('app')
);