import React, { Component } from 'react';
import {routes} from "../../router/RouteConstants";
import ParticipateToEvent from "../Modals/ParticipateToEvent";
import UnParticipateToEvent from "../Modals/UnParticipateToEventModal";

class EventInPost extends React.Component<any, any> {
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
        let participate;
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

                {this.state.event?.members?.map((member:any) => {
                    if(this.props.id !== this.state.event?.owner?.id && member.id === this.props.id){
                        participate = true;
                        return(
                            <UnParticipateToEvent event={this.state.event}></UnParticipateToEvent>
                        )
                    }
                    }
                )}

                {this.props.id !== this.state.event?.owner?.id && !participate ?
                    <ParticipateToEvent event={this.state.event}></ParticipateToEvent>
                    : ""
                }

                <br/><br/>
            </div>        );
    }
}

export default EventInPost;