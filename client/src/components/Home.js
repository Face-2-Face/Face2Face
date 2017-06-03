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
    return (
      <div>
        <div className="row">
          <Header profile={this.state.profile}/>
        </div>
        <div className="row">
          <button type="button" className="btn btn-primary btn-lg btn-block">READY TO VIDEO CHAT</button>       
        </div>
      </div>
    )
  }
}

export default Home
