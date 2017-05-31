import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a><img className="profileIcon" src="public/assets/avatar.png" /></a>
        <h4 className="appName">Face2Face</h4>
        <a><img className="matchesIcon" src="public/assets/chat.png" /></a>
      </div>
    )
  }
}

export default Header
