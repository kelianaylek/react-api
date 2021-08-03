import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const RemoveMemberFromEventModal = (props : { event :any, member :any, refreshEvent :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeMember = async (e : SyntheticEvent, userId: string, eventId: string) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/removeMember/' + eventId + "/" + userId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshEvent()
        handleClose()
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Remove
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove this member from event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => removeMember(e, props.member?.id, props.event?.id)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <p>Are you sure ?</p>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Remove
                        </Button>

                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default RemoveMemberFromEventModal;