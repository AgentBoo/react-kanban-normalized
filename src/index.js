// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
// components
import Root from './components/Root';
// css
import './index.css';


const configured = configureStore();

// NOTE: Inject react app into root div
// ============================================================================ //
ReactDOM.render(
  <Provider store={ configured }>
    <Root />
  </Provider>,
  document.getElementById('root')
);
