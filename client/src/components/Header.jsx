import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    console.log('HEADER: ', this.props);
    return (
      <div>
          <Link to={{pathname: '/profile', state: {profile: this.props.profile}}}><img className="profileIcon" src="public/assets/avatar.png" /></Link>
          <Link to={{pathname: '/logout'}}><img className="logoutIcon" src="public/assets/logout.png" /></Link>
          <Link to={{pathname: '/matches', state: {profile: this.props.profile}}}><img className="matchesIcon" src="public/assets/chat.png" /></Link>
        <Link to={{pathname: '/', state: {profile: this.props.profile}}}><h4 className="appName">Face2Face</h4></Link>
      </div>
    )
  }
}

export default Header
