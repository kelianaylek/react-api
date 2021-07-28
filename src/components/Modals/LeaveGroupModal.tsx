import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const LeaveGroupModal = (props : {group :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const  [redirect, setRedirect ] = useState(false);

    const leaveGroup = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/leave/' + props.group.id, {
            method : 'PUT',
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
                Leave group
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave this group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={leaveGroup}>
                        <p>Are you sure ?</p>

                        <Button variant="primary" type="submit">
                            Leave
                        </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default LeaveGroupModal;