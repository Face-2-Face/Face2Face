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
    this.rejectToMatches = this.rejectToMatches.bind(this);
    this.addToConversations = this.addToConversations.bind(this);
  }

  addToConversations() {
    let user1_id = Math.min(this.state.userID, this.state.otherID);
    let user2_id = Math.max(this.state.userID, this.state.otherID);

    axios.put('/api/conversations/', { user1_id: user1_id, user2_id: user2_id })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addToMatches() {
    // axios put request to update database that user accepts
    let that = this;
    axios.put('/api/matches/accept', {userID: this.state.userID, otherID: this.state.otherID})
      .then(function(response) {
        console.log('PostChat.jsx Response', response.data);
        if (response.data === 'matched') {
          console.log('PostChat.jsx Matches response -----> ', response.data);
          that.addToConversations();
        }
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  rejectToMatches() {
    axios.put('/api/matches/reject', {userID: this.state.userID, otherID: this.state.otherID})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  checkLocation() {
    let otherProfile = this.state.otherProfile;
    if (otherProfile.location) {
      return <div> Location: {otherProfile.location}</div>;
    }
  }

  checkBio() {
    let otherProfile = this.state.otherProfile;
    if (otherProfile.bio) {
      return <div className="bio"> Bio: {otherProfile.bio}</div>;
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
    let otherProfile = this.state.otherProfile;

    return (
      <div>
        <Header />
        <div className="row">
          <p className="text-center profile-name"><strong>{otherProfile.first}</strong></p>
          <img className="img-circle center-block profile-img" src={otherProfile.photo} />
          <p className="sub-header">Age: {otherProfile.age_max} {this.checkLocation()} {this.checkBio()} </p>
        </div>
   
        <div className="inline-row">
          <span onClick={() => this.rejectToMatches()}>
            <Link to={{ pathname: '/matches', state: { profile: this.props.profile } }}><img className="xIcon" src="public/assets/x-icon.png"/></Link>
          </span>
          <span onClick={() => this.addToMatches()}>
            <Link to={{ pathname: '/matches', state: { profile: this.props.profile } }}><img className="heartIcon" src="public/assets/heart.png" /></Link>
          </span>
        </div>

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