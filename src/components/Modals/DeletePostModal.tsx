import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeletePostModal = (props : {post :any, deletePost :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deletePost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/posts/' + props.post.id, {
            method : 'DELETE',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.deletePost()
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={deletePost}>
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

export default DeletePostModal;