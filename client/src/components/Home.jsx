import React from 'react';
import Header from './Header.jsx';
import PreferencesForm from './PreferencesForm.jsx';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      showPreferencesField: false
    }

    this.getUserData = this.getUserData.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }
  handleUserChange(objValue) {
    this.setState({user: objValue})
  }

  componentDidMount() {
    console.log('mount!',this.props.user)
    if(!this.state.user.prefAge_min || !this.props.user.prefAge_min) {

      this.getUserData();
    }
  }

  getUserData(){
    console.log('sup')
    axios.get('/user')
  .then((res) => {
    console.log(res.data);
    this.setState({user: res.data});
  })
  .catch(function (err) {
    console.log('ERROR', err);
  });
  }
  render() {

    if(this.state.user.prefAge_min ) {
      return (
        <div>
          <Header />
          <h1>This is the homepage!</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <h1>This is the Prefs page</h1>
          <PreferencesForm user={this.state.user} onUserChange={this.handleUserChange} />
        </div>
      )
    }
  }
}

export default Home