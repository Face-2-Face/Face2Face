import React from 'react';
import Header from './Header.jsx';
import io from 'socket.io-client';
import axios from 'axios';

// let socket = io('http://localhost:8080')

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      input: '',
      messages: [],
      userProfile: this.props.location.state.userProfile,
      matchProfile: this.props.location.state.matchProfile
      // matchRoom: io.of('/matchexample')
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleIncomingMessages = this.handleIncomingMessages.bind(this);
    this.messageBuilder = this.messageBuilder.bind(this);
  }

  componentDidMount(){
    this.handleIncomingMessages();
    this.state.socket.emit('join', {path: this.props.location.pathname});

  }

  handleIncomingMessages(msg) {
    this.state.socket.on('message', (msg) => {
      this.state.messages.push(msg);
      console.log('this is the messages arr from handleIncomingMessages', this.state.messages);
      this.setState({messages: this.state.messages});
    });
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  messageBuilder(text) {
    //conversation id should get 
    var message = {conversation_id: 1, from: this.state.userProfile.id, to: this.state.matchProfile.id, message: text}
    return message;
  }

  handleOnSubmit(e) {
    e.preventDefault();
    console.log('props passed ==>', this.state.userProfile, 'and match: ', this.state.matchProfile)
    var messageWithNameTag = this.state.userProfile.first + ': ' + this.state.input;
    this.state.socket.emit('message', {messages: messageWithNameTag, path: this.props.location.pathname});
  
    let userPutRoute = '/api/messages/';
    var msg = this.messageBuilder(this.state.input);
    console.log('this is the message on handleSubmit', msg)
    axios.put(userPutRoute, msg)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ input: '' });
  }

  render() {

    var allMessages = this.state.messages.map((message) => {
      return (<li className="message"> {message.messages}</li>)
    });
    return (
      <div>
        <Header />
        <h4>{this.state.matchProfile.first}</h4>
        <div>{allMessages}</div>
        <form onSubmit={this.handleOnSubmit}>
          <input className="text" type="text" value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }
}

export default ChatRoom
