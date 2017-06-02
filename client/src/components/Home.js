import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }
  }

  componentDidMount() {
  let that = this;
  axios.get('/api/user')
    .then(function(response) {
      that.setState({profile: response.data});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    console.log('HOME', this.state.profile)
    return (
      <div>
        <Header />
        <Link to={{pathname:'/profile', state: {profile: this.state.profile}}}>Profile</Link>
        <div><h2>READY TO VIDEO CHAT</h2></div>
      </div>
    )
  }
}

export default Home
