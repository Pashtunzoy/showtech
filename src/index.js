/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import HomePage from './components/contents/HomePage';

render(
    <App>
      <HomePage/>
    </App>,
    document.getElementById('app')
);
