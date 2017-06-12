import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.location.state.profile,
      value: '',
      charsLeft: 255
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleOnSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newCharsLeft = 255 - event.target.value.length;
    this.setState({value: event.target.value, charsLeft: newCharsLeft});
  }

  handleSubmit(event) {
    event.preventDefault();
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
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
        <label>
          About Me:
          <textarea value={this.state.value} onChange={this.handleChange} />
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
