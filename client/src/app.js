import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import StartingScreen from './components/StartingScreen';
import Profile from './components/Profile';
import Settings from './components/Settings';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/welcome" component={StartingScreen} />
      <Route path="/profeel" component={Profile} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>, document.getElementById('root'));