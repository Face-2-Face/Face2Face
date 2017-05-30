import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/Home.js';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
    </div>
  </Router>, document.getElementById('root'));