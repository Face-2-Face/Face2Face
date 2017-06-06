import React from 'react';

class Match extends React.Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div className="match">
        {console.log('matchy', this.props.data)}
        <h1>{this.props.data.match}</h1>
      </div>
    )
  }
}

export default Match;
