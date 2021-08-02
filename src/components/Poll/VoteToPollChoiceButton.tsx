import React, {SyntheticEvent} from "react";
import Cookies from "js-cookie";
import {Button} from "react-bootstrap";

const VoteToPollChoiceButton = (props : {pollChoice : any, refreshPoll :any, poll :any}) => {;

    const voteToPollChoice = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/polls/addVote/' + props.pollChoice.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
        })
        props.refreshPoll(props.poll.id)
    }

    return (
            <Button variant="primary" onClick={voteToPollChoice}>
                Vote
            </Button>
    )
}

export default VoteToPollChoiceButton;