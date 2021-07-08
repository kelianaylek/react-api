import React, { Component } from 'react';
import Groups from "../components/groups";

class GroupList extends Component {
    state = {
        groups : []
    }
    componentDidMount() {
        fetch('https://apisymfonykelian.herokuapp.com/api/groups')
            .then(res => res.json())
            .then((data) => {
                this.setState({ groups : data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <Groups groups={this.state.groups} />

        );
    }
}

export default GroupList;