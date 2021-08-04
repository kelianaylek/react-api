import React from 'react';
import ParticipateToEvent from "../Modals/ParticipateToEvent";
import UnParticipateToEvent from "../Modals/UnParticipateToEventModal";
import moment from "moment";

class EventInPost extends React.Component<any, any> {
    state = {
        event : this.props.event
    }
    constructor(props :any) {
        super(props);
        this.refreshEvents = this.refreshEvents.bind(this)
    }
    refreshEvents(){
        fetch('https://apisymfonykelian.herokuapp.com/api/events/' + this.state.event.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ event : data })
                console.warn(this.state.event)
            })
            .catch(console.log)
    }
    componentDidMount = async () => {
        this.refreshEvents()
    }
    render() {
        let participate;
        return (
            <div>
                <h5>Event : </h5>
                <h6>{this.state.event.title}</h6>
                <p>{this.state.event.description}</p>
                <p>Owner : {this.state.event.owner?.name} </p>
                <p>{moment(this.state.event.startDate).format('DD/MM/YYYY')} - {moment(this.state.event.endDate).format('DD/MM/YYYY')}
                </p>

                {this.state.event?.members?.length === 0 ?
                    <p>No members yet</p>
                    :
                    <p>Members :</p>
                }
                <div className="pb-4">
                    {this.state.event?.members?.map((members:any) => (
                        <div key={members.id}>- {members.name}</div>
                    ))}
                </div>

                {this.state.event?.members?.map((member:any) => {
                    if(this.props.id !== this.state.event?.owner?.id && member.id === this.props.id){
                        participate = true;
                        return(
                            <UnParticipateToEvent refreshEvent={this.refreshEvents} event={this.state.event}></UnParticipateToEvent>
                        )
                    }
                    }
                )}

                {this.props.id !== this.state.event?.owner?.id && !participate ?
                    <ParticipateToEvent refreshEvent={this.refreshEvents} event={this.state.event}></ParticipateToEvent>
                    : ""
                }

                <br/><br/>
            </div>        );
    }
}

export default EventInPost;