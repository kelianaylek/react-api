import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const CreatePostModal = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const createPost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/posts', {
            method : 'POST',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                content,
                image
            })
        })
        window.location.reload();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createPost}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Write your content" onChange={e => setContent(e.target.value)}/>
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

export default CreatePostModal;