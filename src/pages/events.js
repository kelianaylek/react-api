import React, { Component } from 'react';
import Events from "../components/events";

class EventList extends Component {
    state = {
        events : []
    }
    componentDidMount() {
        fetch('https://apisymfonykelian.herokuapp.com/api/events')
            .then(res => res.json())
            .then((data) => {
                this.setState({ events : data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <Events events={this.state.events} />


        );
    }
}

export default EventList;