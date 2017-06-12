import React from 'react';
import axios from 'axios';

class PublicProfile extends React.Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount(){
    console.log('staty', this.state);
    console.log('props', this.props);
  }

  render() {
    return (
      <div>
        <h1>Eyo</h1>
      </div>
    )
  }
}

export default PublicProfile;
