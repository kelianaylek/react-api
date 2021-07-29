import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const EditGroupModal = (props : {group :any, refreshGroup :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');

    const editPost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/' + props.group.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                name,
            })
        })
        props.refreshGroup(props.group.id)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Change name
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editPost}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.group.name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default EditGroupModal;