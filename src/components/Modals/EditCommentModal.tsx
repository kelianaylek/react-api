import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const EditCommentModal = (props : {comment :any, id :any, refreshPost :any, post :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState('');

    const editComment = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/comments/' + props.comment.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                message,
            })
        })
        props.refreshPost(props.post.id)
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editComment}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" defaultValue={props.comment.message} onChange={e => setMessage(e.target.value)}/>
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

export default EditCommentModal;