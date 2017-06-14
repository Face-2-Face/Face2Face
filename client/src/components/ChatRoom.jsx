import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import Header from './Header.jsx';

// let socket = io('http://localhost:8080')
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      input: '',
      messages: [],
      userProfile: this.props.location.state.userProfile,
      matchProfile: this.props.location.state.matchProfile,
      oldMessagesRetrieved: false,
      oldMessages: [],
      mount: true
      // matchRoom: io.of('/matchexample')
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleIncomingMessages = this.handleIncomingMessages.bind(this);
    this.messageBuilder = this.messageBuilder.bind(this);
    this.retrieveOldMessages = this.retrieveOldMessages.bind(this);
  }

  componentDidMount(){
    this.setState({mount: false})
    console.log('MOUNTED')
    if(!this.state.oldMessagesRetrieved) {
      console.log('retrieving msg...');
      this.setState({oldMessagesRetrieved: true});
      this.retrieveOldMessages();
    }
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

  handleOnSubmit(e) {
    e.preventDefault();
    var messageWithNameTag = this.state.userProfile.first + ': ' + this.state.input;
    this.state.socket.emit('message', {messages: messageWithNameTag, path: this.props.location.pathname});

   let userPutRoute = '/api/messages/';
   var msg = this.messageBuilder(this.state.input);
   axios.put(userPutRoute, msg)
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
    this.setState({ input: '' });
  }

  messageBuilder(text) {
    //conversation id should get
    var message = {conversation_id: 1, from: this.state.userProfile.id, to: this.state.matchProfile.id, message: text}
    return message;
  }

  retrieveOldMessages() {
    let that = this;
    const messagePath = '/api/messages/' + '1'; //change to convoID later
    axios.get(messagePath)
      .then(function(response) {
        console.log('RESPONSE ==>', response.data)
        that.setState({oldMessages: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render() {

    var allMessages = this.state.messages.map((message) => {
      return (<li className="message"> {message.messages}</li>)
    });
    var oldMessages = this.state.oldMessages.map((message) => {
      return (<li className="message">{message.content}</li>)
   })
    return (
      <div>
        {this.state.mount ?
          <div>{console.log('prevented mount')}</div>
          :
          <div>
        {console.log('RENDERING CHAT')}
        <Header profile={this.state.profile} show={this.handleMatchListClick} />
        <h4>{this.state.matchProfile.first}</h4>
        <div>{oldMessages}</div>
        <div>{allMessages}</div>
        <form onSubmit={this.handleOnSubmit}>
          <input className="text" type="text" value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
          <input type="submit" value="Submit" />
        </form>
        </div>
        }
      </div>
    )
  }
}

export default ChatRoom;
