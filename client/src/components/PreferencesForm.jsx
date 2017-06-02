import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';

class PreferencesForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div>
        <p>{this.props.user.first}</p>
        <p>Please input your preferences</p>
          <form onSubmit={this.handleSubmit}>
          <ul>
          <li><label>
            My age:
            <input value={this.state.value} onChange={this.handleChange} />
          </label></li>
          <li><label>
            I am a:
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            </select>

            Looking for a:
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            </select>
          </label></li>

          <li><label>
            From age:
            <input value={this.state.value} onChange={this.handleChange} />
            To age:
            <input value={this.state.value} onChange={this.handleChange} />
          </label></li>
          </ul>
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }
}

export default PreferencesForm;
