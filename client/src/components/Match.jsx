import React from 'react';
import axios from 'axios';

class Match extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      profile: {
        first: '',
        photo: ''
      }
    }
  }

  componentDidMount() {
    let that = this;
    const id = this.props.data.match;
    axios.get('/api/profiles/' + id )
    .then(function(response) {
      console.log('server communication from match', response.data);
      that.setState({profile: response.data});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="match">
        <img className="img-circle center-block match-img"src={this.state.profile.photo}/>
        {console.log('matchy', this.props.data)}
        <p>{this.state.profile.first}</p>
      </div>
    )
  }
}

export default Match;
