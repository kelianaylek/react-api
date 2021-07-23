import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeletePollChoiceModal = (props : {poll :any, pollChoice :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createPostChoice = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/polls/removePollChoice/' + props.poll.id + "/" + props.pollChoice.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        window.location.reload();

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Remove
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove this poll choice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure ?</p>
                    <Form onSubmit={createPostChoice}>
                        <Button variant="primary" type="submit">
                            Remove
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )


}

export default DeletePollChoiceModal;