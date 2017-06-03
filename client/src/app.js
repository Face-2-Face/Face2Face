import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>, document.getElementById('root'));