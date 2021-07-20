import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";

const PostComment = (props : {post :any}) => {

    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault()
        const token = Cookies.get('token');

        await fetch('https://apisymfonykelian.herokuapp.com/api/comments/new/' + props.post.id, {
            method : 'POST',
            headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + token},
            body : JSON.stringify({
                message,
                image
            })
        })
        window.location.reload();

    }


    return (
        <form onSubmit={submit}>
            <p className="fw-normal">Send comment</p>

            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="Message" required onChange={e => setMessage(e.target.value)}/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Send</button>
        </form>
    )
}

export default PostComment;