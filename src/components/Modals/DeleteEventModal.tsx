import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeleteEventModal = (props : {event :any, refreshEvent :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteEvent = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/' + props.event.id, {
            method : 'DELETE',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshEvent()
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete Event
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={deleteEvent}>
                        <p>Are you sure ?</p>

                        <Button variant="primary" type="submit">
                            Delete
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default DeleteEventModal;