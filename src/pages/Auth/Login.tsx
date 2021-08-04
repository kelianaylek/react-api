import React, {SyntheticEvent, useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const  [redirect, setRedirect ] = useState(false);
    const [credentialsError, setCredentialsError ] = useState('')
    const [serverError, setServerError ] = useState('')

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
        }).then((response) => {
            if (response.ok) {
                setCredentialsError('')

                return response.json();
            } else {
                setServerError('')
                setCredentialsError('')
                return Promise.reject(response); // 2. reject instead of throw
            }
        })
            .then((responseJson) => {
                Cookies.set('token', responseJson.token);
                setRedirect(true)
                window.location.reload()

                // Do something with the response
            })
            .catch((response) => {
                // 3. get error messages, if any
                if(response.status === 500){
                    setServerError(response.status + " " +  response.statusText)
                }
                response.json().then((json: any) => {
                    console.log(json);
                    setCredentialsError(json.message)
                })
            });


    }
    if(redirect){
        return  <Redirect
            to={{
                pathname: "/",
            }}
        />
    }


    return (
        <>
            <div className="d-flex justify-content-center">
                <form className="w-25" onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control"  placeholder="email@example.fr" required onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control"  placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <p>{credentialsError}</p>
                    <p>{serverError}</p>

                    <button className="w-100 btn btn-lg btn-primary  mb-4" type="submit">Sign in</button>
                </form>
            </div>
            <p>You don't have an account ?</p>
            <Link to="/register">Register</Link>
        </>

    )
}

export default Login;