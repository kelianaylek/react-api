import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";

const SendMessageToGroup = (props : {group :any, refreshGroup :any}) => {

    const [content, setContent] = useState('');

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/groups/addMessage/' + props.group.id, {
            method : 'PUT',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                content,
            })
        })
        setContent('')
        props.refreshGroup(props.group.id)
    }


    return (
        <form onSubmit={submit}>
            <p className="fw-normal">Send message</p>

            <div className="form-floating">
                <input type="text" className="form-control" value={content} placeholder="Message" required onChange={e => setContent(e.target.value)}/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Send</button>
        </form>
    )
}

export default SendMessageToGroup;