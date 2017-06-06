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
    this.chat = this.chat.bind(this);
  }
  chat() {
    console.log('render chat')
  }
  componentDidMount() {
    let that = this;
    const id = this.props.matchID.match;
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
      <div className="match" onClick={this.props.enterChat}>
        <img className="img-circle center-block match-img"src={this.state.profile.photo}/>
        {console.log('matchy', this.props.matchID)}
        <p onClick={this.chat}>{this.state.profile.first}</p>
      </div>
    )
  }
}

export default Match;
