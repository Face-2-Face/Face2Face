import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './Login.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        return (
            <div>
                <Router>
                    <div>
                        <div>Hola Mundo</div>
                        <Route path="/" component={Login}></Route>
                        <Route path="/login" render={(props) => (<div>This is different</div>)}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Main