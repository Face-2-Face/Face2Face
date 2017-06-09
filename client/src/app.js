import React from 'react';
import ReactDOM from 'react-dom';

import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
import MatchList from './components/MatchList';
import VideoChatRoom from './components/VideoChatRoom';
import Logout from './components/Logout';
import Login from './components/Login';



ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/chat" component={ChatRoom} />
      <Route path="/matches" component={MatchList} />
      <Route path="/video" component={VideoChatRoom} />
      <Route path="/chat/:id" component={ChatRoom} />
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
    </div>
  </Router>, document.getElementById('root'));
