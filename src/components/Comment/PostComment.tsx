import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";

const PostComment = (props : {post :any, getPost :any}) => {

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
        fetch('https://apisymfonykelian.herokuapp.com/api/posts/' + props.post.id)
            .then(res => res.json())
            .then((data) => {
                props.getPost(data)
            })
            .catch(console.log)

        setMessage('')
    }

    return (
        <form onSubmit={submit}>
            <div className="form-floating">
                <input type="text" className="form-control" value={message} placeholder="Message" required onChange={e => setMessage(e.target.value)}/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Send</button>
        </form>
    )
}

export default PostComment;