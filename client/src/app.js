import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './components/Home.jsx';
import StartingScreen from './components/StartingScreen.jsx';
import Profile from './components/Profile.jsx';
import Settings from './components/Settings.jsx';
import VideoChat from './components/VideoChat.jsx'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/welcome" component={StartingScreen} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>, document.getElementById('root'));
