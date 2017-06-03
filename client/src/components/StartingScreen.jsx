import React from 'react';

class StartingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Face2Face</h1>
        <h4>Actually Meet People Online</h4>

        <form action="/login" method="post">
        <div>
            <label>Email</label>
            <input type="text"  name="email"></input>
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password"></input>
        </div>

        <button type="submit">Login</button>
        </form>

        <div>
            <a href="/auth/facebook"><img src="public/assets/fb-logo.png" /></a>
        </div>

        <p>Need to sign up for an account? <a href="/signup">Signup</a></p>
        <p><a href="/">home</a></p>

      </div>
    )
  }
}

export default StartingScreen
