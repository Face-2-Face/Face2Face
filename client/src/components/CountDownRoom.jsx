import React from 'react';

import Lobby from './Lobby.jsx';

class CountDownRoom extends React.Component {
  constructor(props){
    super(props)
  }

//TODO onMount take both users out of lobby

  render() {
    return (
      <div>

        <h1>You've been paired with {this.props.match.first}!</h1>
        <h2>Age: {this.props.match.age_min}</h2>
        <img className="img-circle center-block profile-img"src={this.props.match.photo}/>

        <h1>Video Chat starting in 10 seconds... </h1>
      </div>
    )
  }
}

export default CountDownRoom;
