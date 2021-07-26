import React, {SyntheticEvent} from 'react';
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const EventList = ({eventList=[], post, id}:any) => {

    const addEventToPoll = async (postId: string, eventId: string) =>{
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/posts/addEvent/' + postId + "/" + eventId, {
            method : 'PUT',
            headers : {"Authorization" : "Bearer " + token},
        })
        window.location.reload();

    }


    return (
        <>
            { eventList.map((event :any,index :any) => {
                if (event.post === null && event.owner.id === id) {
                    return (
                        <div key={event.id}>
                            <h1>{event.title}</h1>

                            <Button onClick={() => addEventToPoll(post.id, event.id)} variant="primary" type="submit">
                                Add event
                            </Button>
                        </div>
                    )
                }
                return null
            }) }
        </>
    );
}

export default EventList