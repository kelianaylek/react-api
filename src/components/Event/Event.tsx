import React from 'react'
import CreateEventModal from "../Modals/CreateEventModal";
import EditEventModal from "../Modals/EditEventModal";
import DeleteEventModal from "../Modals/DeleteEventModal";
import AddMemberToEventModal from "../Modals/AddMemberToEventModal";
import RemoveMemberFromEventModal from "../Modals/RemoveMemberFromEventModal";
import UnParticipateToEvent from "../Modals/UnParticipateToEventModal"
import moment from "moment";
import {Card} from "react-bootstrap";
import EventInPost from "./EventInPost";

const Event = ({ events, id, refreshEvents }:any) => {

    const refreshEvent = () => {
        refreshEvents()
    }

    return (
        <div>
            <div className="pl-5 pr-4 d-flex justify-content-between">
                <h1>Event List</h1>
                <div>
                    <CreateEventModal refreshEvent={refreshEvent}></CreateEventModal>
                </div>
            </div>


            <h3>My events :</h3>
            <div className="d-flex justify-content-around flex-wrap">
                {events.map((event :any) => {
                        if(event.owner?.id === id){
                            return(
                                <Card style={{ width: '20rem', marginBottom : 10 }}>
                                    <Card.Body>
                                        <div key={event.id} className="">
                                            <div className="d-flex justify-content-between">
                                                <EditEventModal refreshEvent={refreshEvent} event={event}></EditEventModal>
                                                <DeleteEventModal refreshEvent={refreshEvent} event={event}></DeleteEventModal>
                                            </div>

                                            <div className="">
                                                <h4>{event.title}</h4>
                                                <h5>{event.description}</h5>
                                                <p>{moment(event.startDate).format('DD/MM/YYYY')} - {moment(event.endDate).format('DD/MM/YYYY')}
                                                </p>

                                                {event?.members?.length === 0 ?
                                                    <p>There is no members yet, add some !</p>
                                                    :
                                                    <p>Members :</p>
                                                }
                                                <div>
                                                    {event?.members?.map((member:any) => (
                                                        <div className="d-flex align-items-baseline justify-content-between" key={member.id}>
                                                            <p>- {member.name}</p>
                                                            <div>
                                                                <RemoveMemberFromEventModal refreshEvent={refreshEvent} event={event} member={member}></RemoveMemberFromEventModal>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>


                                                <AddMemberToEventModal refreshEvent={refreshEvent} event={event} id={id}></AddMemberToEventModal>

                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>


                            )
                        }
                    }
                )}
            </div>

            <h3>Events shared :</h3>
            <div className="d-flex justify-content-around flex-wrap">
                {events.map((event :any) => {
                            return(
                                <>
                                    {event?.members?.map((member:any) => {
                                        if(member.id === id){
                                            return(
                                                <Card style={{ width: '20rem', marginBottom : 10 }}>
                                                    <Card.Body>
                                                        <div key={event.id} className="">
                                                            <div className="d-flex" key={member.id}>
                                                                <div className="card-body">
                                                                    <h4>{event.title}</h4>
                                                                    <h5>{event.description}</h5>
                                                                    <p>Owner : {event.owner?.name} </p>
                                                                    <p>{moment(event.startDate).format('DD/MM/YYYY')} - {moment(event.endDate).format('DD/MM/YYYY')}
                                                                    </p>
                                                                    <div>
                                                                        Members :
                                                                        {event?.members?.map((member:any) => (
                                                                            <div className="d-flex" key={member.id}>
                                                                                <p>-{member.name}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>


                                                                    <UnParticipateToEvent refreshEvent={refreshEvent} event={event}></UnParticipateToEvent>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        }
                                    })}
                                </>
                            )
                    }
                )}
            </div>



        </div>
    )
};

export default Event