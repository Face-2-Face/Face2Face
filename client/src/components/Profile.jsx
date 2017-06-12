import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.location.state.profile,
<<<<<<< HEAD
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
=======
      bio: this.props.location.state.profile.bio,
      location: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.checkBio = this.checkBio.bind(this);
  }

  handleChange(e) {
    console.log('e', e);
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('e', e);
    // profile = this.props.location.state.profile,
    
    this.props.user.bio = this.state.bio;
    this.props.user.location = this.state.location;

    // still needed?
    this.props.onUserChange(this.props.user);
  }

  checkLocation() {
    let profile = this.state.profile;
    if (profile.location) {
      return <div> Location: {profile.location}</div>;
    }
  }

  checkBio() {
    let profile = this.state.profile;
    if (profile.bio) {
      return <div className="bio"> Bio: {profile.bio}</div>;
    }
  }

  componentDidMount() {
    // console.log('these props', this.props);

    // if (this.props.location) {
    //   this.setState({
    //     bio: this.props.location.profile.bio,
    //     location: this.props.location.profile.location,
    //   });
    // }
>>>>>>> master
  }

  render() {
    let profile = this.state.profile;

    return (
      <div>
          {console.log('props', this.state.profile)}
        <Header />
        <h4>This is the Profile Page</h4>
        <div className="row">
<<<<<<< HEAD
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
=======
          <p className="text-center profile-name"><strong>{profile.first}</strong></p>
          <img className="img-circle center-block profile-img" src={profile.photo} />
          <p className="sub-header">Age: {profile.age_max} {this.checkLocation()} {this.checkBio()} </p>
>>>>>>> master
        </div>
        <form onSubmit={this.handleSubmit}>
          <label className="profile-form">
            Edit Bio:
                    <input name="bio" value={profile.bio} onChange={(e) => this.setState({ bio: e.target.value })} /><br></br>
            Edit Location:
                    <input name="location" value={profile.location} onChange={(e) => this.setState({ location: e.target.value })} />
          </label>
        </form>
        <input type="submit" value="Submit" />

        <div className="row">
<<<<<<< HEAD
          <Link to='/settings' user={profile}><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        </div>
=======
          <br></br>
          <span>Preferences</span><Link to='/settings' profile={this.state.profile}><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        </div>


>>>>>>> master
      </div>
    )
  }
}

export default Profile
