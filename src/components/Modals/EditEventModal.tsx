import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import moment from 'moment'

const EditEventModal = (props : {event :any, refreshEvent :any}, ) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const editEvent = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/events/' + props.event.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                title,
                description,
                startDate,
                endDate
            })
        })
        props.refreshEvent()
        handleClose()
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Edit Event
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editEvent}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" defaultValue={props.event.title} required onChange={e => setTitle(e.target.value)}/>

                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={props.event.description} required onChange={e => setDescription(e.target.value)}/>

                            <Form.Label>Start</Form.Label>
                            <Form.Control type="date" defaultValue={moment(props.event.startDate).format('DD/MM/YYYY')} required onChange={e => setStartDate(e.target.value)}/>

                            <Form.Label>End</Form.Label>
                            <Form.Control type="date" defaultValue={props.event.endDate} required onChange={e => setEndDate(e.target.value)}/>
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

export default EditEventModal;