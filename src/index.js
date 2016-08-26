/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import '../node_modules/sweetalert2/dist/sweetalert2.min.css';
import './styles.scss';
render(<App />, document.getElementById('app'));
