import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import moment from 'moment'

const EditEventModal = (props : {event :any}) => {

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
        window.location.reload();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
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
                            <Form.Control type="text" placeholder={props.event.title} onChange={e => setTitle(e.target.value)}/>

                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={props.event.description} onChange={e => setDescription(e.target.value)}/>

                            <Form.Label>Start</Form.Label>
                            <Form.Control type="date" defaultValue={moment(props.event.startDate).format('DD/MM/YYYY')} onChange={e => setStartDate(e.target.value)}/>

                            <Form.Label>End</Form.Label>
                            <Form.Control type="date" placeholder={props.event.endDate} onChange={e => setEndDate(e.target.value)}/>
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