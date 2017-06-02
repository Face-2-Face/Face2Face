import React from 'react';
import Header from './Header.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <h4>This is the Profile Page</h4>
      </div>
    )
  }
}

export default Profile
