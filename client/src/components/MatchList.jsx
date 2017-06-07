import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Home from './Home.js';
import Header from './Header.jsx';
import Match from './Match.jsx';
import ChatRoom from './ChatRoom.jsx';


class MatchList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      matchList: [],
      showChat: false,
      matchProfile: {},
      profile: this.props.location.state.profile

    }
    this.enterChat = this.enterChat.bind(this);
  }

  enterChat(targetUser){
    console.log('enter chat between', this.props.profile, ' and ', targetUser);
    this.setState({showChat: true, matchProfile: targetUser})

  }

  componentDidMount() {
    console.log('MatchList User Id: ', this.state.profile.id);
    const id = this.state.profile.id;
    let that = this;
    axios.get('/api/matches/' + id)
      .then(function(response) {
        console.log('server communication', response.data);
        that.setState({matchList: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
          {console.log('props in matchlist', this.state.profile)}
        <Header />
        <div>
          {this.state.showChat ?
            <div>
              <h1>Chat</h1>

              <ChatRoom profile={this.state.profile} matchProfile={this.state.matchProfile}/>
            </div>
            :
        <div>
        <h1>Matches</h1>
        <div >
          {this.state.matchList.map(item =>
            <Match matchID={item} enterChat={this.enterChat} userProfile={this.state.profile}/>)}
        </div>
        <button onClick={this.enterChat}>Chat</button>


        </div>
      }
      </div>
    </div>
    )
  }
}



export default MatchList;
