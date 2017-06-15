import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile,
      bioValue: this.props.location.state.profile.bio,
      locationValue: this.props.location.state.profile.location,
      charsLeft: 255,
      sendProfileToDB: false
    }

    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBioChange(event) {
    var newCharsLeft = 255 - event.target.value.length;
    this.setState({bioValue: event.target.value, charsLeft: newCharsLeft});
  }

  handleLocationChange(event) {
    this.setState({locationValue: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    let profile = Object.assign({}, this.state.profile);
    profile.bio = this.state.bioValue;
    profile.location = this.state.locationValue;
    this.setState({profile, sendProfileToDB: true})
  }

  componentDidUpdate() {
    if(this.state.sendProfileToDB) {
      this.setState({sendProfileToDB: false});
      console.log('updating profile in database...');
      let userPutRoute = '/api/profiles/' + this.state.profile.id;
      axios.put(userPutRoute, this.state.profile)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  componentDidMount() {
    var newCharsLeft = 255 - this.props.location.state.profile.bio.length;
    this.setState({charsLeft: newCharsLeft})
  }

  render() {
    let profile = this.state.profile;
    return (
      <div>
          {console.log('props in profile', this.state.profile)}
        <Header />
        <div className="row">
          <p className="profileName"><h1>Hello {profile.first}!</h1></p>
        </div>
        <div className="row">
          <img className="img-circle center-block profile-img"src={profile.photo}/>
          <h2 className="profileAge">Age: {profile.age_min}</h2>
          <h2 className="profileLocation">Location: {profile.location}</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
        <label className="editPreferences">
          <div className="aboutMe">About Me:</div>
          <div className="bioChange"><textarea value={this.state.bioValue} onChange={this.handleBioChange} /></div>
          <div className="charactersLeft"><p>Chars left: {this.state.charsLeft}</p></div>
          <div className="location">Location:</div>
          <div className="locationChange"><input className="locationInput" value={this.state.locationValue} onChange={this.handleLocationChange} /></div>
        </label>
        <input className="submitButton" type="submit" value="Save" />
      </form>
        </div>
        <Link to={{pathname: '/edit-preferences', state: {profile: this.state.profile}}}><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        <Link to={{pathname: '/logout'}}><img className="logoutIcon" src="public/assets/logout.png" /></Link>
        <div className="row">
        </div>
      </div>
    )
  }
}
export default Profile
