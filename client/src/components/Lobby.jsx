import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.jsx';
import CountDownRoom from './CountDownRoom.jsx';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile,
      foundUserToChatWith: false,
      userToChatWith: ''
    }

  }

  componentDidMount() {
    let userPutRoute = '/api/lobby/' + this.state.profile.id;
    let that = this;
    console.log('LOBBY', userPutRoute);
    console.log('LOBBY profile', this.state.profile);
    axios.put(userPutRoute, {room: 'lobby'})
      .then(function(response) {
        console.log('sent to db', response);
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get('/api/lobby/')
    .then(function(response) {
      console.log('match: ', response.data);
      that.setState({foundUserToChatWith: true, userToChatWith: response.data});
    })
    .catch(function(error) {
      console.log('error in get',error);
    });

  }
  // get a toChatWith GET from lobby
  // remove them from lobby PUT

  render() {
    return (
      <div>
        <div className="row">
          <Header profile={this.state.profile}/>
        </div>
        {this.state.foundUserToChatWith ?
          <div>
          <CountDownRoom profile={this.state.profile} match={this.state.userToChatWith}/>
          </div>
          :
          <h3>Connecting ... </h3>
        }
      </div>

    )
  }


}

export default Lobby
