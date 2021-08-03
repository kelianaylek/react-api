import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import { HiOutlineCog } from "react-icons/hi";

const EditMessageModal = (props : {message :any, refreshGroup :any, group :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content, setContent] = useState('');

    const editMessage = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/editMessage/' + props.message.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                content,
            })
        })
        props.refreshGroup(props.group.id)
        handleClose()

    }

    return (
        <>
            <Button className="mr-2" variant="warning" onClick={handleShow}>
                <HiOutlineCog></HiOutlineCog>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editMessage}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Message</Form.Label>
                            <Form.Control type="text" defaultValue={props.message.content} required onChange={e => setContent(e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default EditMessageModal;