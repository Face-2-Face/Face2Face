import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Video from 'twilio-video';
import qs from 'qs';

class VideoChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qstring: this.props.location.search.slice(1),
      roomName: '',
      userID: '',
      otherID: '',
      room: null,
      videoChatComplete: false
    };
    this.roomJoined = this.roomJoined.bind(this);
    this.participantConnected = this.participantConnected.bind(this);
    this.toDisconnect = this.toDisconnect.bind(this);
  }

  roomJoined(room) {
    let that = this;
    this.setState({ room: room });
    var localContainer = document.getElementById('local-media');
    console.log('Room', room);
    room.participants.forEach(this.participantConnected);
    room.on('participantConnected', this.participantConnected);
    room.on('participantDisconnected', function (participant) {
      participant.tracks.forEach(track => {
        track.detach().forEach(function (detachedElement) {
          detachedElement.remove();
        });
      });
      that.toDisconnect();
    });
    if (!localContainer.querySelector('video')) {
      room.localParticipant.tracks.forEach(track => {
        localContainer.appendChild(track.attach());
      });
    }
  }

  participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);
    var previewContainer = document.getElementById('remote-media');
    participant.on('trackAdded', track => {
      previewContainer.appendChild(track.attach());
    });
    participant.tracks.forEach(track => {
      previewContainer.appendChild(track.attach());
    });
  }

  componentDidMount() {  
    var identity;
    let info = qs.parse(this.state.qstring);
    this.setState({roomName: info.room, userID: info.userID, otherID: info.otherID});

    let that = this;
    axios.get('/token')
      .then(function (response) {
        console.log('Response', response);
        identity = response.data.identity;
        Video.connect(response.data.token, { name: that.state.roomName }).then(that.roomJoined, function (error) {
          console.log('Could not connect: ', error.message);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  toDisconnect() {
    console.log('got into toDisconnect');
    this.state.room.disconnect();
    this.setState({videoChatComplete: true});
  }

  render() {
    let next;
    if (this.state.videoChatComplete) {
      var queryString = '?userID=' + this.state.userID + '&otherID=' + this.state.otherID;
      next = <div><Redirect to={{pathname: '/postchat', search: queryString}} /></div>;
    } else {
      next = <div></div>;
    }
    return (
      <div>
        <div className="main-video">
        <div id="remote-media">
          <div id="local-media"></div>
            <img className="xIconRed" src="public/assets/x-icon-red.png" onClick={() => this.toDisconnect()}/>
          {next}
          </div>
        
        </div>
        
      </div>
    );
  }
}
export default VideoChatRoom;

 


