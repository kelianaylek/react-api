import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const ParticipateToEvent = (props : {event :any, refreshEvent :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const participateToEvent = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/participateToEvent/' + props.event.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshEvent()
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Participate
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Participate </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={participateToEvent}>
                        <p>Are you sure ?</p>
                        <Button variant="primary" type="submit">
                            Yes
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default ParticipateToEvent;