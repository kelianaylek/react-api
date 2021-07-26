import React, {SyntheticEvent, useState, useEffect} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import SearchEvent from "../Event/SearchBar";
import EventList from "../Event/EventList";


const AddEventToPostModal = ({post, event, id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState('');
    const [eventListDefault, setEventListDefault] = useState();
    const [eventList, setEventList] = useState();

    const fetchData = async () => {
        return await fetch('https://apisymfonykelian.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                setEventList(data)
                setEventListDefault(data)
            });}

    const updateInput = async (input) => {
        const filtered = eventListDefault?.filter((event) => {
            return event.title.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setEventList(filtered);
    }

    useEffect( () => {fetchData()},[]);

    if(id === post.author.id){
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Add event
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add an event to this post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <h1>Event List</h1>
                        <SearchEvent
                            input={input}
                            onChange={updateInput}
                        />

                        <EventList eventList={eventList} post={post} id={id}/>

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

export default AddEventToPostModal;