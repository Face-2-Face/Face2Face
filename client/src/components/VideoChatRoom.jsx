import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Video from 'twilio-video';

class VideoChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {}
    }
    this.roomJoined = this.roomJoined.bind(this);
    this.participantConnected = this.participantConnected.bind(this);
  }

  roomJoined(room) {
    var localContainer = document.getElementById('local-media');
    console.log('Room', room);
    room.participants.forEach(this.participantConnected);
    room.on('participantConnected', this.participantConnected);
    // attach local participant's tracks
    if (!localContainer.querySelector('video')) {
      room.localParticipant.tracks.forEach(track => {
        localContainer.appendChild(track.attach());
      });
    }
  }

  participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);

    // const div = document.createElement('div');
    // div.id = participant.sid;
    // div.innerText = participant.identity;
    var previewContainer = document.getElementById('remote-media');

    participant.on('trackAdded', track => {
      previewContainer.appendChild(track.attach());
    });
    participant.tracks.forEach(track => {
      previewContainer.appendChild(track.attach());
    });
  // participant.on('trackRemoved', trackRemoved);
  // document.body.appendChild(div);
  }

  componentDidMount() {
    var identity;
    let that = this;
    axios.get('/token')
      .then(function(response) {
        console.log('Response', response);
        identity = response.data.identity;
        Video.connect(response.data.token, {name: 'tester'}).then(that.roomJoined, function(error) {
          console.log('Could not connect: ', error.message);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render() {

    return (

      <div>
        <div id="local-media"></div>
        <div id="remote-media"></div>
      
      </div>

    )
  }
}

export default VideoChatRoom