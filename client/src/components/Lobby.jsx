import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile
    }

  }

  componentDidMount() {
    let userPutRoute = '/api/lobby/' + this.state.profile.id;
    console.log('LOBBY', userPutRoute);
    console.log('LOBBY profile', this.state.profile);
    axios.put(userPutRoute, {inLobby: true})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    axios.get('/api/lobby')
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  }
  // get a toChatWith GET from lobby
  // send the two users to chat page
  // remove them from lobby PUT

  render() {
    return (
      <div>
        <div className="row">
          <Header profile={this.state.profile}/>
        </div>
          <h3>Connecting ... </h3>
      </div>

    )
  }


}

export default Lobby

