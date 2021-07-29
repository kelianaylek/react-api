import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const EditPostModal = (props : {post :any, editPost :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content, setContent] = useState('');
    const [post, setPost] = useState('')

    const editPost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/posts/' + props.post.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                content,
            })
        }).then(res => res.json())
            .then((data) => {
                setPost(data)
                props.editPost(data)
            })
            .catch(console.log)
        handleClose()
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editPost}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" defaultValue={props.post.content} onChange={e => setContent(e.target.value)}/>
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

export default EditPostModal;