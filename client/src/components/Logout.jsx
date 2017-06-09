import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: true
    }

  }

  componentWillMount() {
    axios({
      url: '/logout',
      method: 'GET'
    })
      .then((res) => {
        console.log(res);
        this.setState({complete: false})
      })
      .catch((error) => {
        console.log('this is the error from the logout page', error);
      });
  }

  render() {
    if (this.state.complete) {
      return null;
    } else {
      return <Redirect to='/' />;
    }
  }
}

export default Logout;
