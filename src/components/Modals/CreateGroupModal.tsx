import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const CreateGroupModal = (props : {refreshGroups :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createGroup = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups', {
            method : 'POST',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshGroups()
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Group
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createGroup}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <p>Create a new group ?</p>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default CreateGroupModal;