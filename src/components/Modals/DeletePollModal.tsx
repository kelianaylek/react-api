import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const DeletePollModal = (props : {post :any, id :number, refreshPost :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const post = props.post;
    const id = props.id

    const createPost = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/polls/' + props.post.poll.id, {
            method : 'DELETE',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshPost(props.post.id)
        handleClose()
    }

    if(id === post.author?.id && post?.poll !== null){
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Remove Poll
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove poll from your post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={createPost}>
                            <Button variant="primary" type="submit">
                                Remove
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </>
        )
    }else{
        return null
    }

}

export default DeletePollModal;