import React from 'react';
import axios from 'axios';
class PublicProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      profile: this.props.location.state.profile
    }
  }
  componentDidMount(){
    console.log('state profile', this.state.profile);
  }
  render() {
    return (
      <div>
        <h1>{this.state.profile.first}</h1>
        {console.log('props', this.state.profile)}
        <img className="img-circle center-block match-img"src={this.state.profile.photo}/>
        <div>
          <h3>About {this.state.profile.first}: </h3>
          <p>{this.state.profile.bio}</p>
        </div>
      </div>
    )
  }
}
export default PublicProfile;