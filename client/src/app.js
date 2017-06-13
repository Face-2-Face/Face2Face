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
import PreferencesForm from './components/PreferencesForm';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
import MatchList from './components/MatchList';
import VideoChatRoom from './components/VideoChatRoom';
import Logout from './components/Logout';
import PostChat from './components/PostChat';
import PublicProfile from './components/PublicProfile';
import EditPreferences from './components/EditPreferences';


//comment
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/public-profile" component={PublicProfile} />
      <Route path="/preferences" component={PreferencesForm} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/chat" component={ChatRoom} />
      <Route path="/video" component={VideoChatRoom} />
      <Route path="/postchat" component={PostChat} />
      <Route path="/chat/:id" component={ChatRoom} />
      <Route path="/matches" component={MatchList} />
      <Route path="/logout" component={Logout} />
      <Route path="/edit-preferences" component={EditPreferences} />
    </div>
  </Router>, document.getElementById('root'));
