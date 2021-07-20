import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";

class Event extends React.Component<any, any> {
    state = {
        event : this.props.event
    }
    componentDidMount = async () => {

        fetch('https://apisymfonykelian.herokuapp.com/api/events/' + this.state.event.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ event : data })
                console.warn(this.state.event)
            })
            .catch(console.log)
    }
    render() {
        return (
            <div>
                <h2>Event : </h2>
                <p>Id : {this.state.event.id}</p>
                <p>Title : {this.state.event.title}</p>
                <p>Description : {this.state.event.description}</p>
                <p>Owner : {this.state.event.owner?.id} - {this.state.event.owner?.name} </p>
                <p>
                    Members :
                    {this.state.event?.members?.map((members:any) => (
                        <span key={members.id}> User : {members.name} - </span>
                    ))}
                </p>
                <p>Start : {this.state.event.startDate}</p>
                <p>End : {this.state.event.endDate}</p>

            </div>        );
    }
}

export default Event;