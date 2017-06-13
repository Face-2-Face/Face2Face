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
  componentDidUpdate(){
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
  render() {
    let profile = this.state.profile;
    return (
      <div>
          {console.log('props', this.state.profile)}
        <Header />
        <h4>This is the Profile Page</h4>
        <div className="row">
          <p className="text-center profile-name"><strong>Hello {profile.first}!</strong></p>
        </div>
        <div className="row">
          <img className="img-circle center-block profile-img"src={profile.photo}/>
          <h2>Age: {profile.age_min}</h2>
          <h2>Location: {profile.location}</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
        <label>
          About Me:
          <textarea value={this.state.bioValue} onChange={this.handleBioChange} />
          <input value={this.state.locationValue} onChange={this.handleLocationChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <div><p>Chars left: {this.state.charsLeft}</p></div>
        </div>
        <div className="row">
          <Link to='/settings' user={profile}><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        </div>
      </div>
    )
  }
}
export default Profile