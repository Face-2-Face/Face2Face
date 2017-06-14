import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        mounted: false,
        profile: {}
    }
  }

  componentDidMount(){
    // if(this.props && !this.state.mounted) {
    //   console.log('header has props', this.state.profile)
    //   this.setState({profile: this.props.profile, mounted: true})
    // } else {
    //   console.log('header has no props')
    // }
    let that = this;
    axios.get('/api/user')
      .then(function(response) {
        that.setState({profile: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
          <Link to={{pathname: '/profile', state: {profile: this.state.profile}}}><img className="profileIcon" src="public/assets/avatar.png" /></Link>
          <Link to={{pathname: '/logout'}}><img className="logoutIcon" src="public/assets/logout.png" /></Link>
          <Link to={{pathname: '/matches', state: {profile: this.state.profile}}}><img className="matchesIcon" src="public/assets/chat.png" /></Link>
        <Link to={{pathname: '/', state: {profile: this.state.profile}}}><h4 className="appName">Face2Face</h4></Link>
      </div>
    )
  }
}

export default Header
