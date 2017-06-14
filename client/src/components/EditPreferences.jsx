import React from 'react';
import axios from 'axios';
import Header from './Header';
import Profile from './Profile';

class EditPreferences extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      profile: this.props.location.state.profile,
      age_min: this.props.location.state.profile.age_min,
      age_max: this.props.location.state.profile.age_max,
      gender: this.props.location.state.profile.gender,
      prefGender: this.props.location.state.profile.prefGender,
      prefAge_min: this.props.location.state.profile.prefAge_min,
      prefAge_max: this.props.location.state.profile.prefAge_max,
      sendProfileToDB: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    let profile = Object.assign({}, this.state.profile);
    profile.age_min = this.state.age_min;
    profile.age_max = this.state.age_max;
    profile.gender = this.state.gender;
    profile.prefGender = this.state.prefGender;
    profile.prefAge_min = this.state.prefAge_min;
    profile.prefAge_max = this.state.prefAge_max;

    if(profile.prefAge_min > 17) {
      this.setState({profile, sendProfileToDB: true})
    }
  }

  componentDidUpdate(){
    if(this.state.sendProfileToDB) {
      this.setState({sendProfileToDB: false});
      console.log('updating preferences in database...');
      let userPutRoute = '/api/profiles/' + this.state.profile.id;
      axios.put(userPutRoute, this.state.profile)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    let profile = this.state.profile;
    return (
      <div>
        <Header />
        {console.log('props in edits', this.state.profile)}
        <h1>Edit Preferences</h1>
          <h2>{this.state.profile.first}</h2>
          <form onSubmit={this.handleSubmit}>
            <ul>
              <li><label>
                My age:
                <input name="age" value={this.state.age_min} onChange={(e) => this.setState({ age_min: e.target.value, axe_max: e.target.value})} />
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
          <input type="submit" value="Save" />
        </form>
      </div>

    )
  }
}

export default EditPreferences;
