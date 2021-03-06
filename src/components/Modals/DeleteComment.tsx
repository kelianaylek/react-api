import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import { HiTrash } from "react-icons/hi";

const DeleteCommentModal = (props : {comment :any, id :any, refreshPost :any, post :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deletePost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/comments/' + props.comment.id, {
            method : 'DELETE',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshPost(props.post.id)
        handleClose()
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <HiTrash></HiTrash>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your comment</Modal.Title>
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

export default DeleteCommentModal;