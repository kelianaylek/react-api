import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import Event from '../../components/Event/Event'

class EventList extends React.Component<any> {

    state = {
        events : [],
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
            <Event events={this.state.events} id={this.props.id}/>
        );
    }
}

export default EventList;