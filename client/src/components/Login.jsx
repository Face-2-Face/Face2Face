import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    axios({
      url: '/login',
      method: 'POST'
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <Redirect to='/logout' />;
  }
}

export default Login;
