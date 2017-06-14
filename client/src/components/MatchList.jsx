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
      matchProfile: {},
      userProfile: this.props.location.state.profile
    }
  }

  componentDidMount() {
    const id = this.state.userProfile.id;
    let that = this;
    axios.get('/api/matches/' + id)
      .then(function(response) {
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
          <h1>Matches</h1>
          <div>
            {this.state.matchList.map(item =>
            <Match matchID={item} userProfile={this.state.userProfile}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default MatchList;
