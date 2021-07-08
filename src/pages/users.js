import React, { Component } from 'react';
import Users from "../components/users";

class App extends Component {
    state = {
        users : []
    }
    componentDidMount() {
        fetch('https://apisymfonykelian.herokuapp.com/api/users')
            .then(res => res.json())
            .then((data) => {
                this.setState({ users : data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <Users users={this.state.users} />


        );
    }
}

export default App;