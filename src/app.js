import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { CatContainer } from './containers/catContainer';
import configureStore from './configureStore';

let store = configureStore();

const MOUNT_NODE = document.getElementById('reactRoot');

render(
  <Provider store={store}>
    <CatContainer />
  </Provider>,
  MOUNT_NODE
);
