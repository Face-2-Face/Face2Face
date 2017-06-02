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
          <p></p>
        </div>
        <div className="row">
          <p className="text-center profile-name"><strong>Hello {profile.first}</strong></p>
        </div>
        <div className="row">
          <img className="img-circle center-block profile-img"src={profile.photo}/>
        </div>        
      </div>
    )
  }
}

export default Profile
