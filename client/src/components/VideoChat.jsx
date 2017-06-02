import React from 'react';
import Header from './Header.jsx';
// import VideoChatLogic from './VideoChatLogic.js';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <h4>This is the Video Chat Room</h4>
      </div>
    );
  }
}
export default VideoChat;