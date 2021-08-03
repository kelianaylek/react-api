import React, {SyntheticEvent, useState} from "react";
import Cookies from "js-cookie";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

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
            <div className="form-floating d-flex">
                <input type="text" className="form-control form-control-lg" value={content} placeholder="Message" required onChange={e => setContent(e.target.value)}/>
                <button className="btn btn-primary" type="submit"><HiOutlineArrowCircleUp color="white"></HiOutlineArrowCircleUp></button>
            </div>

        </form>
    )
}

export default SendMessageToGroup;