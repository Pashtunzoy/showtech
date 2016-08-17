/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/contents/HomePage';
import Register from './components/contents/Register';
import Payment from './components/contents/Payment';
import '../node_modules/sweetalert2/dist/sweetalert2.min.css';


render(
    <Router history={browserHistory}>
      <Route path="/"  component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/register" component={Register}/>
        <Route path="/payment" component={Payment}/>
      </Route>
    </Router>,
    document.getElementById('app')
);
