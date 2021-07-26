import React, {useState} from 'react'
import {Link} from "react-router-dom";
import CreateEventModal from "../Modals/CreateEventModal";
import EditEventModal from "../Modals/EditEventModal";
import DeleteEventModal from "../Modals/DeleteEventModal";
import AddMemberToEventModal from "../Modals/AddMemberToEventModal";
import RemoveMemberFromEventModal from "../Modals/RemoveMemberFromEventModal";
import {Button} from "react-bootstrap";
import Cookies from "js-cookie";

const Event = ({ events, id }:any) => {

    return (
        <div>
            <h1>Event List</h1>

            <CreateEventModal></CreateEventModal>

            <div className="d-flex justify-content-around flex-wrap">
                {events.map((event :any) => {
                        if(event.owner?.id === id){
                            return(
                                <div key={event.id} className="card w-30 mb-4">

                                    <div className="card-body">

                                        <EditEventModal event={event}></EditEventModal>
                                        <DeleteEventModal event={event}></DeleteEventModal>

                                        <p>Id : {event.id}</p>
                                        <p>Title : {event.title}</p>
                                        <p>Description : {event.description}</p>
                                        <p>Owner : {event.owner?.id} - {event.owner?.name} </p>
                                        <div>
                                            Members :
                                            {event?.members?.map((member:any) => (
                                                <div className="d-flex" key={member.id}>
                                                    <p>-{member.name}</p>

                                                    <RemoveMemberFromEventModal event={event} member={member}></RemoveMemberFromEventModal>

                                                </div>
                                            ))}
                                        </div>
                                        <p>Start : {event.startDate}</p>
                                        <p>End : {event.endDate}</p>

                                        <AddMemberToEventModal event={event} id={id}></AddMemberToEventModal>

                                    </div>
                                </div>

                            )
                        }
                    }
                )}
            </div>

        </div>
    )
};

export default Event