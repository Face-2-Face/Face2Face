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
      showChat: false,
      matchList: []
    }
    this.enterChat = this.enterChat.bind(this);
  }

  enterChat(){
    console.log('enter chat click', this.props.profile);
    this.setState({showChat: true})

  }

  componentDidMount() {
    console.log('MatchList User Id: ', this.props.profile.id);
    const id = this.props.profile.id;
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
        <Header />
        <div>
          {this.state.showChat ?
            <div>
              <h1>Chat</h1>

              <ChatRoom profile={this.props.profile} />
            </div>
            :
        <div>
        <h1>Matches</h1>
        <div >
          {this.state.matchList.map(item =>
            <Match matchID={item} enterChat={this.enterChat} userProfile={this.props.profile}/>)}
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
