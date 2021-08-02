import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeleteMessageModal = (props : {message :any, group :any, refreshGroup :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteMessage = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/removeMessage/' + props.group.id +"/" + props.message.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshGroup(props.group.id)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={deleteMessage}>
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

export default DeleteMessageModal;