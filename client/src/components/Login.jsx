import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        return (
            <div>
                <div className="col-sm-6 col-sm-offset-3">

                <h1><span className="fa fa-sign-in"></span>Login</h1>
                <div className="alert alert-danger">

                <form action="/login" method="post">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password"></input>
                    </div>

                    <button type="submit" className="btn btn-warning btn-lg">Login</button>
                </form>

                <div>
                    Or login with any of the following services:<br />
                    <a href="/auth/facebook"><img src="/assets/fb-logo.png" /></a>
                    <a href="/auth/google"><img src="/assets/google-logo.png" /></a>
                    <a href="/auth/twitter"><img src="/assets/twitter-logo.png" /></a>
                </div>

                <p>Need to sign up for an account? <a href="/signup">Signup</a></p>
                <p><a href="/">home</a></p>

            </div>
            </div>
            </div>
        );
    }
}

export default Login