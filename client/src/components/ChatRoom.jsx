import React from 'react';
import Header from './Header.jsx';
import io from 'socket.io-client';

let socket = io('http://localhost:8080')

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  // componentDidMount(){
  //   this.handleOnSubmit();
  // }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e) {
    // e.preventDefault()
    socket.emit('message', {message: this.state.input});
    this.setState({input:''})
  }

  render() {
    return (
      <div>
        <Header />
        <h4>This is the Chat Interface</h4>
        <form onSubmit={this.handleOnSubmit}>
          <input className="text" type="text" value={this.state.input} onChange={this.handleOnChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ChatRoom
