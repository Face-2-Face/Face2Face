import React from 'react';
import { Link } from 'react-router-dom';
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
      matchPath: this.props.location.pathname,
      conversationID: 0,
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
    this.getConversationID = this.getConversationID.bind(this);
    this.getEndofPath = this.getEndofPath.bind(this);
  }

  componentDidMount(){
    this.setState({mount: false})
    console.log('MOUNTED')
    if(!this.state.oldMessagesRetrieved) {
      console.log('retrieving msg...');
      this.setState({oldMessagesRetrieved: true});
      this.getConversationID();
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
    this.state.socket.emit('message', {messages: this.state.input, path: this.props.location.pathname, senderID: this.state.userProfile.id});

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

  getConversationID() {
    let that = this;
    var id = this.getEndofPath(this.state.matchPath);
    console.log('getting convo: ', id)
    const conversationPath = '/api/conversations/' + id;
    axios.get(conversationPath)
      .then(function(response) {
        console.log('GOT CONVO ==> ', response.data);
        that.setState({conversationID: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getEndofPath(path) {
    var arr = path.split('/');
    return arr[2];
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
      if(message.senderID === this.state.userProfile.id) {
        return (<div className="singleLine"><p className="messageISent"> {message.messages}</p></div>)
      }
      return (<div className="singleLine"><p className="messageTheySent"> {message.messages}</p></div>)
    });
    var oldMessages = this.state.oldMessages.map((message) => {
      console.log('msg: ', message.sender, ' me: ', this.state.userProfile.id)
      if(message.recipient === this.state.userProfile.id){

        return (<div className="singleLine"> <p className="messageISent">{message.content} <br /></p></div>)
      } else {
        return (<div className="singleLine"> <p className="messageTheySent">{message.content} <br /> </p></div>)
      }
   })
    return (
      <div>
        <div className="chatHeader">
          <Link to={{pathname: '/matches', state: {profile: this.state.userProfile}}}><p className="backArrow"> ⮂</p></Link>
          <h1>{this.state.matchProfile.first}</h1>
        </div>

      <div className="chatRoomContainer">
        <div className="messageContainer">
          <div className="oldMessageContainer">{oldMessages}</div>
          <div>{allMessages}</div>
        </div>
      </div>
      <form className="messageField" onSubmit={this.handleOnSubmit}>
        <input className="messageInputField" type="text" value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
        <input className="sendMessageButton" type="submit" value="Send" />
      </form>
    </div>
    )
  }
}

export default ChatRoom;
