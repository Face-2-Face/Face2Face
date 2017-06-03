import React from 'react';
import Header from './Header.jsx';
import ChatRoom from './ChatRoom.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {

  }

  handleMessage(message) {
    this.setState({messages: message})
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default Home
