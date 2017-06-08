import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleMatchListClick = this.handleMatchListClick.bind(this);
  }

  handleMatchListClick(){
    this.props.show()
  }


  render() {
    console.log('HEADER', this.props);
    return (
      <div>
          <Link to={{pathname: '/profile', state: {profile: this.props.profile}}}><img className="profileIcon" src="public/assets/avatar.png" /></Link>
          <img className="matchesIcon" src="public/assets/chat.png" onClick={this.handleMatchListClick}/>
        <Link to={{pathname: '/', state: {profile: this.props.profile}}}><h4 className="appName">Face2Face</h4></Link>
      </div>
    )
  }
}

export default Header
