import React, {SyntheticEvent, useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const  [redirect, setRedirect ] = useState(false);

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault()

        await fetch('https://apisymfonykelian.herokuapp.com/api/login_check', {
            method : 'POST',
            headers : {"Content-Type" : "application/json"},
            credentials: 'include',
            body : JSON.stringify({
                username,
                password
            })
        }).then(response=>response.json())
            .then(function (data){
                Cookies.set('token', data.token);

            })
        setRedirect(true);
    }
    if(redirect){
        return <Redirect to="/"/>
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control"  placeholder="email@example.fr" required onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control"  placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    )
}

export default Login;