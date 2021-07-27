import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeleteGroupModal = (props : {group :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const  [redirect, setRedirect ] = useState(false);

    const deleteGroup = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/' + props.group.id, {
            method : 'DELETE',
            headers : {"Authorization" : "Bearer " + token},
        })
        setRedirect(true);
    }
    if(redirect){
        return <Redirect to="/groups"/>
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete group
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={deleteGroup}>
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

export default DeleteGroupModal;