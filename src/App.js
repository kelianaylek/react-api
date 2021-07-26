import React, {useEffect, useState} from 'react';
import "./App.css"
import Login from './pages/Auth/Login'
import Nav from './components/Navbar/Nav'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home"
import Register from "./pages/Auth/Register";
import Cookies from "js-cookie";
import PostList from "./pages/Post/posts";
import Post from "./pages/Post/post";
import Event from './pages/Event/Event'

function App(){
    const [name, setName] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        (
            async () => {
                const response = await fetch('https://apisymfonykelian.herokuapp.com/api/users/connected', {
                    headers : {"Content-Type" : "application/json", "Authorization" : "Bearer " + Cookies.get('token')},
                    credentials : 'include'
                })
                const content = await response.json()
                setName(content.name)
                setId(content.id)
            }
        )();
    });

  return (
      <div className="App">
          <BrowserRouter>
                <div>
                    <Nav name={name}></Nav>

                    <main>
                        <Switch>
                            <Route path="/" component={() => <Home name={name}/>} exact/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/posts" component={() => <PostList id={id}/>}/>
                            <Route path={"/post/:postId"} component={Post}/>

                            <Route path="/events" component={() => <Event id={id}/>}/>

                        </Switch>
                    </main>
                </div>
          </BrowserRouter>

      </div>
      )

}

export default App;