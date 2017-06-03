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
import Lobby from './components/Lobby';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/welcome" component={StartingScreen} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/lobby" component={Lobby} />
    </div>
  </Router>, document.getElementById('root'));