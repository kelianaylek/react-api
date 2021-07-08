import React from "react";
import {routes} from "../router/RouteConstants";
import {Link} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        alert('A form was submitted: ' + this.state);

        fetch('https://apisymfonykelian.herokuapp.com/api' + routes.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            // We convert the React state to JSON and send it as the POST body
        }).then(function(response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <Link to={{ pathname: `signup`}}>Sign up</Link>

            </div>
        );
    }
}

export default Login;