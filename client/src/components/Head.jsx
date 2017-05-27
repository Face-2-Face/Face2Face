import React from 'react';

class Head extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        return (
            <div>
            <head>
                <title>Node Authentication</title>
                <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"></link>
            </head>
            <div className="container"></div>
            </div>
        );
    }
}

export default Head