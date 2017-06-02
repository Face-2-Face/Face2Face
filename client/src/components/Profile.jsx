import React from 'react';
import Header from './Header.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile
    }
  }




  render() {
    let profile = this.state.profile;

    return (
      <div>
        <Header />
        <h2 className="test">Hello {profile.first}</h2>
        <img className="img-circle profile-img"src={profile.photo}/>
      </div>
    )
  }
}

export default Profile
