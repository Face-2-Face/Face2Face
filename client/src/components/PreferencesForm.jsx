import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';

import Home from './Home.jsx';

class PreferencesForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      age: '',
      gender: '',
      prefGender: '',
      prefAge_min: '',
      prefAge_max: '',
      goHome: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.user.age = this.state.age;
    this.props.user.gender = this.state.gender;
    this.props.user.prefGender = this.state.prefGender;
    this.props.user.prefAge_min = this.state.prefAge_min;
    this.props.user.prefAge_max = this.state.prefAge_max;

    console.log(this.props.user);
    this.props.onUserChange(this.props.user)
    this.setState({goHome: true});
  }

  render() {

    return (
      <div>
        {this.state.goHome ?
          <div>
            <Home user={this.props.user} />
          </div>
          : <div>
        <p>{this.props.user.first}</p>
        <p>Please input your preferences</p>
          <form onSubmit={this.handleSubmit}>
          <ul>
          <li><label>
            My age:
            <input name="age" value={this.state.age} onChange={(e) => this.setState({ age: e.target.value})} />
          </label></li>
          <li><label>
            I am a:
            <select name="gender" value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value})}>
            <option value="">Select</option>
            <option value="male">Man</option>
            <option value="female">Woman</option>
            </select>

            Looking for a:
            <select name="prefGender" value={this.state.prefGender} onChange={(e) => this.setState({ prefGender: e.target.value})}>
            <option value="">Select</option>
            <option value="male">Man</option>
            <option value="female">Woman</option>
            </select>
          </label></li>

          <li><label>
            From age:
            <input name="prefAge_min" value={this.state.prefAge_min} onChange={(e) => this.setState({ prefAge_min: e.target.value})} />
            To age:
            <input name="prefAge_max" value={this.state.prefAge_max} onChange={(e) => this.setState({ prefAge_max: e.target.value})} />
          </label></li>
          </ul>
          <input type="submit" value="Submit" />
        </form>
      </div>
      }
      </div>
    )
  }
}

const Warning = () => {
  return <h1>Warning</h1>
}

export default PreferencesForm;
