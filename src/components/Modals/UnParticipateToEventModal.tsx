import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const UnParticipateToEvent = (props : {event :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const unParticipate = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/unParticipateToEvent/' + props.event.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        window.location.reload();

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Unparticipate
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Unparticipate </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={unParticipate}>
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

export default UnParticipateToEvent;