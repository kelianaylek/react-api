import React, {Component, useEffect, useState} from 'react';
import "./App.css"
import Login from './pages/Login'
import Nav from './components/Nav'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register";
import Cookies from "js-cookie";

function App(){
    const [name, setName] = useState('')

    useEffect(()=>{
        (
            async () => {
                const response = await fetch('https://apisymfonykelian.herokuapp.com/api/users/connected', {
                    headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + Cookies.get('token')},
                    credentials : 'include'
                })
                const content = await response.json()
                setName(content.name)
            }
        )();
    });

  return (
      <div className="App">
          <BrowserRouter>
                <div>
                    <Nav name={name}></Nav>
                    <main className="form-signin">
                        <Switch>
                            <Route path="/" component={() => <Home name={name}/>} exact/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                        </Switch>
                    </main>
                </div>
          </BrowserRouter>

      </div>
      )

}

export default App;