import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import { HiOutlineMinusSm} from "react-icons/hi";

const RemoveEventFromPost = (props : {post :any, id :any, refreshPost :any}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeEvent = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/posts/removeEvent/' + props.post.id, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        props.refreshPost(props.post.id)
        handleClose()

    }
    if(props.id === props.post?.author?.id){
        return (
            <>
                <Button variant="danger" onClick={handleShow}>
                    Event <HiOutlineMinusSm></HiOutlineMinusSm>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove your event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={removeEvent}>
                            <p>Are you sure ?</p>

                            <Button variant="primary" type="submit">
                                Remove
                            </Button>
                        </Form>

                    </Modal.Body>

                </Modal>
            </>
        )
    }else{
        return(
            <></>
        )
    }

}

export default RemoveEventFromPost;