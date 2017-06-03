import React from 'react';
import Header from './Header.jsx';
import io from 'socket.io-client';

// let socket = io('http://localhost:8080')

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      input: '',
      messages: []
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleIncomingMessages = this.handleIncomingMessages.bind(this);
  }

  componentDidMount(){
    this.handleIncomingMessages();
  }

  handleIncomingMessages(msg) {
    this.state.socket.on('message', (msg) => {
      console.log('this is the msg from handleIncomingMessages', msg);
      this.state.messages.push(msg);
      console.log('this is the messages arr from handleIncomingMessages', this.state.messages);
     this.setState();
    })
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e) {
     e.preventDefault();
    console.log('this is the input from handleOnSubmit', this.state.input);
    this.state.socket.emit('message', {messages: this.state.input});
     this.setState({ input: '' })
  }



  render() {
    var allMessages = this.state.messages.map(function(message) {
      return (<li className="message">{message.messages}</li>)
    });
    return (
      <div>
        <Header />
        <h4>This is the Chat Interface</h4>
        <form onSubmit={this.handleOnSubmit}>
          <input className="text" type="text" value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
          <input type="submit" value="Submit" />
        </form>
        <div>{allMessages}</div>

      </div>
    )
  }
}

export default ChatRoom
