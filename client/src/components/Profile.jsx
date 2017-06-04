import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';



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
        <h4>This is the Profile Page</h4>
        <div className="row">
          <p className="text-center profile-name"><strong>Hello {profile.first}!</strong></p>
        </div>
        <div className="row">
          <img className="img-circle center-block profile-img"src={profile.photo}/>
        </div>
        <div className="row">
          <span>Preferences</span><Link to='/settings'><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        </div>
                
      </div>
    )
  }
}

export default Profile
