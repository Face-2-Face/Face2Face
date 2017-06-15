import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import Profile from './Profile.jsx';
import axios from 'axios';
import qs from 'qs';

class PostChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      otherID: '',
      userProfile: {},
      otherProfile: {}
    };

    this.checkLocation = this.checkLocation.bind(this);
    this.checkBio = this.checkBio.bind(this);
    this.addToMatches = this.addToMatches.bind(this);
  }

  addToMatches(objValue) {
    let dummy = this.state.dummyUser;
    console.log(dummy, 'dummy');
    this.setState({ profile: objValue });
    // axios post request to update database
    axios.put('/api/matches/', this.state.profile)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  componentWillMount() {
    let qstring = this.props.location.search.slice(1);
    let info = qs.parse(qstring);
    this.setState({userID: info.userID, otherID: info.otherID});
  }

  componentDidMount() {
    let that = this;
    // get user profile
    axios.get('/api/profiles/'+this.state.userID)
      .then(function(response) {
        that.setState({userProfile: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
    // get other profile
    axios.get('/api/profiles/'+this.state.otherID)
      .then(function(response) {
        that.setState({otherProfile: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log('PostChat.jsx ------>', this.state.userProfile);

    return (

      <div>
          {console.log('In RENDER')}
        {/*<Header />
        <div className="row">
          <p className="text-center profile-name"><strong>{profile.first}</strong></p>
          <img className="img-circle center-block profile-img" src={profile.photo} />
          <p className="sub-header">Age: {profile.age_max} {this.checkLocation()} {this.checkBio()} </p>
        </div>
   
        <div className="inline-row">
          <Link to='/'><img className="xIcon" src="public/assets/x-icon.png"/></Link>
          <span onClick={() => this.addToMatches()}>
            <Link to={{ pathname: '/matches', state: { profile: this.props.profile } }}><img className="heartIcon" src="public/assets/heart.png" /></Link>
          </span>
        </div>*/}

      </div>
    );
  }
}

export default PostChat;

      // dummyUser: {
      //   id: 17,
      //   first: 'Sam',
      //   location: 'San Francisco',
      //   bio: 'Hi my name is what, my name is who, my name is...',
      //   age_max: '27',
      //   photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16684098_10209773354423131_8111954378602662091_n.jpg?oh=22c5e51a7eb3d2f28c2ae3eb677fb7c3&oe=59A6C096'
      // }