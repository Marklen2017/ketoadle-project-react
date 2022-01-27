// @flow

import React from "react";
import "./index.css";
import "./c3jscustom.css";
import App from "./App.react";
import { Provider } from 'react-redux';
import { render } from 'react-dom'
import { store } from './redux/Store';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root')

// eslint-disable-next-line no-new-func
// document.oncontextmenu = new Function("return false;");

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
