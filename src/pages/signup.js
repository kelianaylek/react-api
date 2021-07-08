import React from "react";
import {routes} from "../router/RouteConstants";
import {Link} from "react-router-dom";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '' };
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

        fetch('https://apisymfonykelian.herokuapp.com/api' + routes.POST_USER, {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
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
                        Name:
                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={this.state.email} name="email" onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <Link to={{ pathname: `login`}}>Login</Link>

            </div>
        );
    }
}

export default SignUpForm;