import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import Header from './Header.jsx';
import CountDownRoom from './CountDownRoom.jsx';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile,
      enteredLobby: false,
      room:'',
      otherID: null,
      foundUserToChatWith: false
    }
    this.getVideoChatAssignment = this.getVideoChatAssignment.bind(this);
  }

  componentDidMount() {
    let userPutRoute = '/api/lobby/' + this.state.profile.id;
    let that = this;
    axios.put(userPutRoute, {room: 'lobby'})
      .then(function(response) {
        that.setState({enteredLobby: true});
      })
      .catch(function(error) {
        console.log(error);
      });
    this.getVideoChatAssignment();
  }

  getVideoChatAssignment() {
    let that = this;
    axios.get('/api/lobby/')
      .then(function(response) {
        console.log('Lobby.jsx VideoChat Assignment -----> ', response.data);
        if (response.data.room === 'lobby' || that.state.enteredLobby === false) {
          setTimeout(that.getVideoChatAssignment, 10000);
        } else {
          // send to the chat room with the profile (which contains room assignment)
          that.setState({room: response.data.room, otherID: response.data.otherID, foundUserToChatWith: true});
          console.log('Lobby.jsx Room Assignment Info -----> ', response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.foundUserToChatWith && this.state.otherID) {
      axios.put('/api/profiles/' + this.state.profile.id, {room: this.state.room})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
        console.log(error);
        });

        axios.put('/api/profiles/' + this.state.otherID, {room: this.state.room})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
        console.log(error);
        });
      }
  }

  componentWillUnmount() {
    let userPutRoute = '/api/lobby/' + this.state.profile.id;
    let that = this;
    axios.put(userPutRoute, {room: 'false'})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.foundUserToChatWith) {

      var queryString = '?room=' + this.state.room + '&userID=' + this.state.profile.id + '&otherID=' + this.state.otherID;
    }
    return (
      <div>
        <div className="row">
          <Header profile={this.state.profile}/>
        </div>
        {this.state.foundUserToChatWith ?
          <div>
            <Redirect to={{pathname: '/video', search: queryString}} />;
          </div>
          :
          <h3>Connecting ... </h3>
        }
      </div>
    )
  }
}

export default Lobby
//NOTES: on line 82, matt added , userProfile: this.state.profile, otherProfile: this.state.otherID -- Remove if needed
// <CountDownRoom profile={this.state.profile} match={this.state.userToChatWith}/>
