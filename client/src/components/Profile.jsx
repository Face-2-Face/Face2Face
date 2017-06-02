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
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <h1 className="text-center">Hello {profile.first}</h1>
        </div>
        <div className="row">
          <img className="img-circle center-block profile-img"src={profile.photo}/>
        </div>        
      </div>
    )
  }
}

export default Profile
