import React from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import Home from './Home.js';
import Profile from './Profile.jsx';

class PreferencesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: '',
      gender: '',
      prefGender: '',
      prefAge_min: '',
      prefAge_max: '',
      goHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.user.age_min = this.state.age;
    this.props.user.age_max = this.state.age;
    this.props.user.gender = this.state.gender;
    this.props.user.prefGender = this.state.prefGender;
    this.props.user.prefAge_min = this.state.prefAge_min;
    this.props.user.prefAge_max = this.state.prefAge_max;

    this.props.onUserChange(this.props.user);
    this.setState({goHome: true});
  }

  componentDidMount() {
    console.log('these props', this.props);

    if (this.props.location) {
      this.setState({
        age: this.props.location.profile.age,
        gender: this.props.location.profile.gender,
        prefGender: this.props.location.profile.prefGender,
        prefAge_min: this.props.location.profile.prefAge_min,
        prefAge_max: this.props.location.profile.prefAge_max,
      });
    }
  }


  render() {
    return (
      <div>
        {this.state.goHome ?
          <div>
            <Home user={this.props.user} />
          </div>
          :
          <div>
            <h2>Please input your preferences</h2>
            <form onSubmit={this.handleSubmit}>
              <ul>
                <li><label className="editText">
                  My age:
                  <input className="ageInput" name="age" value={this.state.age} onChange={(e) => this.setState({ age: e.target.value})} />
                </label></li>
                <li><label className="editText">
                  I am a:
                  <select className="prefGenderSelect" name="gender" value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value})}>
                    <option value="">Select</option>
                    <option value="male">Man</option>
                    <option value="female">Woman</option>
                  </select>

                  Looking for a:
                  <select className="prefGenderSelect" name="prefGender" value={this.state.prefGender} onChange={(e) => this.setState({ prefGender: e.target.value})}>
                    <option value="">Select</option>
                    <option value="male">Man</option>
                    <option value="female">Woman</option>
                  </select>
                </label></li>
                <li><label className="editText">
                  From age:
                  <input className="prefAgeInput" name="prefAge_min" value={this.state.prefAge_min} onChange={(e) => this.setState({ prefAge_min: e.target.value})} />
                  To age:
                  <input className="prefAgeInput" name="prefAge_max" value={this.state.prefAge_max} onChange={(e) => this.setState({ prefAge_max: e.target.value})} />
                </label></li>
              </ul>
            <input className="saveButton" type="submit" value="Submit" />
          </form>
        </div>
      }
      </div>
    );
  }
}

export default PreferencesForm;
