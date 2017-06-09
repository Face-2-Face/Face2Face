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
        console.log(error);
      });
  }

  render() {
    if (this.state.complete) {
      return <Redirect to='/login' />;
    } else {
      return <Redirect to='/login' />;
    }
  }
}

export default Logout;
