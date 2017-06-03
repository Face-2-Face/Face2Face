import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PreferencesForm from './PreferencesForm.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      showPreferencesField: false
    }

    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(objValue) {
    this.setState({profile: objValue})
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
    if(this.state.profile.prefAge_min ) {
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
    } else {
      return (
        <div>
          <Header />
          <h1>This is the Prefs page</h1>
          <PreferencesForm user={this.state.profile} onUserChange={this.handleUserChange} />
        </div>
      )
    }
  }
}

export default Home
