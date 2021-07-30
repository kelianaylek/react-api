import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  [redirect, setRedirect ] = useState(false);
    const [emailError, setEmailError ] = useState('')
    const [nameError, setNameError ] = useState('')
    const [passwordError, setPasswordError ] = useState('')
    const [serverError, setServerError ] = useState('')

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault()
        await fetch('https://apisymfonykelian.herokuapp.com/api/users', {
            method : 'POST',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                    name,
                    email,
                    password
                })

        }).then((response) => {
            if (response.ok) {
                setNameError('')
                setEmailError('')
                setPasswordError('')

                return response.json();
            } else {
                setServerError('')
                setNameError('')
                setEmailError('')
                setPasswordError('')
                return Promise.reject(response); // 2. reject instead of throw
            }
        })
            .then((responseJson) => {
                setRedirect(true)
                // Do something with the response
            })
            .catch((response) => {
                // 3. get error messages, if any
                if(response.status === 500){
                    setServerError(response.status + " " +  response.statusText)
                }
                response.json().then((json: any) => {
                    console.log(json);
                    if(json.email !== undefined){
                        setEmailError(json.email.message)
                    }
                    if(json.name !== undefined){
                        setNameError(json.name.message)
                    }
                    if(json.password !== undefined){
                        setPasswordError(json.password.message)
                    }
                })
            });

    }
    if(redirect){
        return <Redirect to="/login"/>
    }

    return (
    <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <div className="form-floating">
            <input type="text" className="form-control"  placeholder="Name" required onChange={e => setName(e.target.value)}/>
        </div>
        <p>{nameError}</p>

        <div className="form-floating">
            <input type="email" className="form-control"  placeholder="name@example.com" required onChange={e => setEmail(e.target.value)}/>
        </div>
        <p>{emailError}</p>

        <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
        </div>
        <p>{passwordError}</p>

        <p>{serverError}</p>

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
    </form>
    )
}

export default Register;