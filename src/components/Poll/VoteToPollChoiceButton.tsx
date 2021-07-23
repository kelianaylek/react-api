import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";

const VoteToPollChoiceButton = (props : {pollChoice : any}) => {;

    const voteToPollChoice = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/polls/addVote/' + props.pollChoice.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
        })
        window.location.reload();
    }

    return (
            <Button variant="primary" onClick={voteToPollChoice}>
                Vote
            </Button>
    )
}

export default VoteToPollChoiceButton;