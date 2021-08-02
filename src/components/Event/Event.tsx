import React from 'react'
import CreateEventModal from "../Modals/CreateEventModal";
import EditEventModal from "../Modals/EditEventModal";
import DeleteEventModal from "../Modals/DeleteEventModal";
import AddMemberToEventModal from "../Modals/AddMemberToEventModal";
import RemoveMemberFromEventModal from "../Modals/RemoveMemberFromEventModal";
import UnParticipateToEvent from "../Modals/UnParticipateToEventModal"
import moment from "moment";

const Event = ({ events, id, refreshEvents }:any) => {

    const refreshEvent = () => {
        refreshEvents()
    }

    return (
        <div>
            <h1>Event List</h1>

            <CreateEventModal refreshEvent={refreshEvent}></CreateEventModal>

            <h3>My events :</h3>
            <div className="d-flex justify-content-around flex-wrap">
                {events.map((event :any) => {
                        if(event.owner?.id === id){
                            return(
                                <div key={event.id} className="card w-30 mb-4">
                                    <div className="card-body">
                                        <EditEventModal refreshEvent={refreshEvent} event={event}></EditEventModal>
                                        <DeleteEventModal refreshEvent={refreshEvent} event={event}></DeleteEventModal>

                                        <p>Id : {event.id}</p>
                                        <p>Title : {event.title}</p>
                                        <p>Description : {event.description}</p>
                                        <p>Owner : {event.owner?.id} - {event.owner?.name} </p>
                                        <div>
                                            Members :
                                            {event?.members?.map((member:any) => (
                                                <div className="d-flex" key={member.id}>
                                                    <p>-{member.name}</p>

                                                    <RemoveMemberFromEventModal refreshEvent={refreshEvent} event={event} member={member}></RemoveMemberFromEventModal>

                                                </div>
                                            ))}
                                        </div>
                                        <p>Start : {moment(event.startDate).format('DD/MM/YYYY')}</p>
                                        <p>End : {moment(event.endDate).format('DD/MM/YYYY')}</p>

                                        <AddMemberToEventModal refreshEvent={refreshEvent} event={event} id={id}></AddMemberToEventModal>

                                    </div>
                                </div>

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
                                                <div key={event.id} className="card w-30 mb-4">
                                                    <div className="d-flex" key={member.id}>
                                                        <div className="card-body">
                                                            <p>Id : {event.id}</p>
                                                            <p>Title : {event.title}</p>
                                                            <p>Description : {event.description}</p>
                                                            <p>Owner : {event.owner?.id} - {event.owner?.name} </p>
                                                            <div>
                                                                Members :
                                                                {event?.members?.map((member:any) => (
                                                                    <div className="d-flex" key={member.id}>
                                                                        <p>-{member.name} - {member.id}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p>Start : {moment(event.startDate).format('DD/MM/YYYY')}</p>
                                                            <p>End : {moment(event.endDate).format('DD/MM/YYYY')}</p>

                                                            <UnParticipateToEvent refreshEvent={refreshEvent} event={event}></UnParticipateToEvent>
                                                        </div>
                                                    </div>
                                                </div>

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