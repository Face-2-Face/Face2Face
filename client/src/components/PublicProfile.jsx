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
          <Link to={{pathname: '/matches', state: {profile: this.state.userProfile}}}><p className="backArrow"> ⮂</p></Link>
          <h1>{this.state.profile.first}</h1>
        </div>
        <img className="publicProfilePhoto" src={this.state.profile.photo}/>
        <div className="publicProfileContainer">
          <h3>About {this.state.profile.first}: </h3>
          <p className="publicBio">{this.state.profile.bio}</p>
          <h3>Age: {this.state.profile.age_min}</h3>
          <h3>Location: {this.state.profile.location}</h3>

        </div>
      </div>
    )
  }
}
export default PublicProfile;
