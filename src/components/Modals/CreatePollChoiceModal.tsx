import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const CreatePollChoiceModal = (props : {post :any, refreshPoll :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const post = props.post;
    const [title, setTitle] = useState('');


    const createPostChoice = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/polls/addPollChoice/' + props.post.poll.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
            body : JSON.stringify({
                title,
            })
        })
        props.refreshPoll(props.post.poll.id)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Poll Choice
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a poll choice to your poll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createPostChoice}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="title" onChange={e => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )


}

export default CreatePollChoiceModal;