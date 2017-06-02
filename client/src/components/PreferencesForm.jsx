import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';

class PreferencesForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <p>{this.props.user.first}</p>
        <p>Please input your preferencs</p>

      
      </div>
    )
  }
}

export default PreferencesForm;
