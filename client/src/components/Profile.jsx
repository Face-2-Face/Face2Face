import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.location.state.profile,
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
  }

  render() {
    let profile = this.state.profile;

    return (
      <div>
          {console.log('props', profile)}
        <Header />
        <h4>This is the Profile Page</h4>
        <div className="row">
          <p className="text-center profile-name"><strong>{profile.first}</strong></p>
          <img className="img-circle center-block profile-img" src={profile.photo} />
          <p className="sub-header">Age: {profile.age_max} {this.checkLocation()} {this.checkBio()} </p>
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
          <br></br>
          <span>Preferences</span><Link to='/settings' profile={this.state.profile}><img className="settingsIcon" src="public/assets/settings.png"/></Link>
        </div>


      </div>
    );
  }
}

export default Profile;
