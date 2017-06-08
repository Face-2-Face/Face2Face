import React from 'react';
import Header from './Header.jsx';
import PreferencesForm from './PreferencesForm.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div>
        {console.log('render prefs', this.props)}
        <Header />

        <PreferencesForm user={this.props.profile} />
      </div>
    )
  }
}

export default Settings
