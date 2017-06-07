import React from 'react';
import axios from 'axios';

import ChatRoom from './ChatRoom.jsx'

class Match extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userProfile: {},
      matchProfile: {
        first: '',
        photo: ''
      }
    }
  }

  componentDidMount() {
    let that = this;
    const id = this.props.matchID.match;
    axios.get('/api/profiles/' + id )
    .then(function(response) {
      that.setState({matchProfile: response.data});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="match" onClick={()=>this.props.enterChat(this.state.matchProfile)}>
        <img className="img-circle center-block match-img"src={this.state.matchProfile.photo}/>
        <p>{this.state.matchProfile.first}</p>
      </div>
    )
  }
}

export default Match;
