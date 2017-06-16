import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PublicProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      profile: this.props.location.state.profile,
      userProfile: this.props.location.state.userProfile
    }
  }
  componentDidMount(){
    console.log('state profile', this.state);
  }
  render() {
    return (
      <div>
        <div className="chatHeader">
          <Link to={{pathname: '/matches', state: {profile: this.state.userProfile}}}><img className="backArrow" src="../public/assets/backArrow.png" /></Link>
          <h1>{this.state.profile.first}</h1>
        </div>
        <img className="publicProfilePhoto" src={this.state.profile.photo}/>
        <div className="publicProfileContainer">
          <div className="aboutMe">
          <div className="aboutPublic">About {this.state.profile.first}: </div>
          <div className="bioPublic">{this.state.profile.bio}</div>
          <div className="agePublic">Age: {this.state.profile.age_min}</div>
          <div className="locationPublic">Location: {this.state.profile.location}</div>
        </div>

        </div>
      </div>
    )
  }
}
export default PublicProfile;
